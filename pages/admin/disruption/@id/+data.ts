import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { CalendarData } from "@/shared/types/calendar-data";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";
import { DisruptionSource } from "@/server/database-source/disruption-source";
import { AlertSource } from "@/server/database-source/alert-source";
import { AlertPreview } from "@/shared/types/alert-data";

export type Data = {
  disruption:
    | {
        type: "valid";
        title: string;
        bodyMarkdown: string;
        link: string;
        calendar: CalendarData | null;
        highlighting: SerializedMapHighlighting;
      }
    | {
        type: "invalid";
        title: string;
        bodyMarkdown: string;
        raw: string;
      }
    | null;
  alert?: AlertPreview[number];
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { routeParams } = pageContext;
  const app = pageContext.custom.app;

  const id = routeParams.id;
  const disruption = await DisruptionSource.getInstance(app).getDisruption({
    id,
  });
  if (disruption == null) {
    return { disruption: null };
  }

  const alert = await AlertSource.getInstance(app).getFirstAlert({
    ids: disruption.sourceAlertIds,
  });

  const writeup = disruption.data.getWriteupAuthor().write(app, disruption);
  const period = disruption.period.toBson();
  const itNeverEnds = "end" in period ? period.end.type === "never" : false;

  if (!disruption.data.validate(app)) {
    return {
      disruption: {
        type: "invalid",
        title: writeup.title,
        bodyMarkdown: writeup.bodyMarkdown,
        raw: disruption.data.inspect(),
      },
      alert: alert ? { title: alert.data.title, id: alert.id } : undefined,
    };
  }

  return {
    disruption: {
      type: "valid",
      title: writeup.title,
      bodyMarkdown: writeup.bodyMarkdown,
      link:
        alert?.data.url ?? "https://www.ptv.vic.gov.au/live-travel-updates/",
      calendar: itNeverEnds
        ? null
        : createCalendarData([disruption.period], app.time.now()),
      highlighting: MapHighlighting.serializeGroup([
        disruption.data.getMapHighlighter().getHighlighting(app),
      ]),
    },
    alert: alert ? { title: alert.data.title, id: alert.id } : undefined,
  };
}
