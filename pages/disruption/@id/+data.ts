import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { CalendarData } from "@/shared/types/calendar-data";
import { getDemoDisruptions } from "@/server/data/disruption/demo-disruptions";
import { App } from "@/server/app";
import { LineCollection } from "@/server/data/line/line-collection";
import { Line } from "@/server/data/line/line";
import { parseIntNull } from "@dan-schel/js-utils";

export type Data = {
  disruption: {
    // TODO: Everything else.
    title: string;
    bodyMarkdown: string;
    link: string;
    calendar: CalendarData;
  } | null;
  back: {
    name: string;
    href: string;
  };
};

export function data(pageContext: PageContext): Data & JsonSerializable {
  const { urlParsed, routeParams } = pageContext;
  const app = pageContext.custom.app;

  const back = determineBackBehaviour(app, urlParsed);
  const id = routeParams.id;

  const disruption = getDemoDisruptions(app).find((x) => x.id === id);

  if (disruption == null) {
    return { disruption: null, back };
  }

  const writeup = disruption.data.getWriteupAuthor().write(app, disruption);

  return {
    disruption: {
      title: writeup.title,
      bodyMarkdown: writeup.bodyMarkdown,

      // TODO: Fetch from the source alerts, presumably?
      link: "https://www.ptv.vic.gov.au/live-travel-updates/",

      calendar: createCalendarData([disruption.period], app.time.now()),
    },
    back,
  };
}

function determineBackBehaviour(
  app: App,
  urlParsed: { search: Record<string, string> },
) {
  const from = urlParsed.search.from ?? "";

  // TODO: I don't think this is ever used in practice yet.
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
    href: "/",
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
