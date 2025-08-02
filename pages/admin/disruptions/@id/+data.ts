import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { AlertRepository } from "@/server/database-repository/alert-repository";
import { DisruptionRepository } from "@/server/database-repository/disruption-repository";
import { JsonSerializable } from "@/shared/json-serializable";
import { AlertPreview } from "@/shared/types/alert-data";
import { CalendarData } from "@/shared/types/calendar-data";
import { SerializedMapHighlighting } from "@/shared/types/map-data";
import { PageContext } from "vike/types";

export type Data = {
  disruption:
    | {
        title: string;
        bodyMarkdown: string;
        calendar: CalendarData | null;
        highlighting: SerializedMapHighlighting;
        alerts: AlertPreview;
      }
    | {
        title: string;
        bodyMarkdown: string;
        calendar: CalendarData | null;
        raw: string;
        alerts: AlertPreview;
      }
    | null;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { routeParams } = pageContext;
  const app = pageContext.custom.app;

  const id = routeParams.id;

  const disruption = await DisruptionRepository.getRepository(
    app,
  ).getDisruption({ id, valid: "either" });
  if (disruption == null) {
    return { disruption: null };
  }

  const alerts: AlertPreview = (
    await AlertRepository.getRepository(app).listAlerts({
      ids: disruption.sourceAlertIds,
    })
  ).map((alert) => ({ title: alert.data.title, id: alert.id }));

  const writeup = disruption.data.getWriteupAuthor().write(app, disruption);
  const period = disruption.period.toBson();
  const itNeverEnds = "end" in period ? period.end.type === "never" : false;

  if (!disruption.data.validate(app)) {
    return {
      disruption: {
        title: writeup.title,
        bodyMarkdown: writeup.bodyMarkdown,
        calendar: itNeverEnds
          ? null
          : createCalendarData([disruption.period], app.time.now()),
        raw: disruption.data.inspect(),
        alerts,
      },
    };
  }

  return {
    disruption: {
      title: writeup.title,
      bodyMarkdown: writeup.bodyMarkdown,
      calendar: itNeverEnds
        ? null
        : createCalendarData([disruption.period], app.time.now()),
      highlighting: MapHighlighting.serializeGroup([
        disruption.data.getMapHighlighter().getHighlighting(app),
      ]),
      alerts,
    },
  };
}
