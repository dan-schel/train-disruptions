import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { CalendarData } from "@/shared/types/calendar-data";
import { App } from "@/server/app";
import { LineCollection } from "@/server/data/line/line-collection";
import { Line } from "@/server/data/line/line";
import { parseIntNull } from "@dan-schel/js-utils";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";
import { DisruptionSource } from "@/server/database-source/disruption-source";
import { AlertSource } from "@/server/database-source/alert-source";

export type Data = {
  disruption: {
    title: string;
    bodyMarkdown: string;
    link: string;
    calendar: CalendarData | null;
    highlighting: SerializedMapHighlighting;
  } | null;
  back: {
    name: string;
    href: string;
  };
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { urlParsed, routeParams } = pageContext;
  const app = pageContext.custom.app;

  const back = determineBackBehaviour(app, urlParsed);
  const id = routeParams.id;

  const disruption = await DisruptionSource.getInstance(app).getDisruption({
    id,
    valid: true,
  });

  if (disruption == null) {
    return { disruption: null, back };
  }

  let link = "https://www.ptv.vic.gov.au/live-travel-updates/";
  if (disruption.sourceAlertIds.length > 0) {
    const alert = await AlertSource.getInstance(app).getFirstAlert({
      ids: disruption.sourceAlertIds,
    });

    if (alert) {
      link = alert.data.url;
    }
  }

  const period = disruption.period.toBson();
  const itNeverEnds = "end" in period ? period.end.type === "never" : false;

  const writeup = disruption.data.getWriteupAuthor().write(app, disruption);
  return {
    disruption: {
      title: writeup.title,
      bodyMarkdown: writeup.bodyMarkdown,
      link,
      calendar: itNeverEnds
        ? null
        : createCalendarData([disruption.period], app.time.now()),
      highlighting: MapHighlighting.serializeGroup([
        disruption.data.getMapHighlighter().getHighlighting(app),
      ]),
    },
    back,
  };
}

function determineBackBehaviour(
  app: App,
  urlParsed: { search: Record<string, string> },
) {
  const from = urlParsed.search.from ?? "";

  if (from.startsWith("line")) {
    const line = tryGetLine(app.lines, from.split("-")[1]);
    if (line != null) {
      return {
        name: `${line.name} Line`,
        href: `/line/${line.id}`,
      };
    }
  }

  return {
    name: "Overview",
    href: "/overview",
  };
}

// TODO: This is used in multiple places. Move to a utils file?
function tryGetLine(
  lines: LineCollection,
  idStr: string | null | undefined,
): Line | null {
  if (idStr == null) {
    return null;
  }

  const id = parseIntNull(idStr);
  if (id == null) {
    return null;
  }

  return lines.get(id);
}
