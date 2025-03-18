import { PageContext } from "vike/types";
import { parseIntNull } from "@dan-schel/js-utils";
import { LineCollection } from "@/server/data/line/line-collection";
import { Line } from "@/server/data/line/line";
import { JsonSerializable } from "@/shared/json-serializable";
import { CalendarData } from "@/shared/types/calendar-data";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { getDemoDisruptions } from "@/server/data/disruption/demo-disruptions";

export type Data = {
  line: {
    name: string;
    calendar: CalendarData;
  } | null;
};

export function data(pageContext: PageContext): Data & JsonSerializable {
  const { app } = pageContext.custom;

  const line = tryGetLine(app.lines, pageContext.routeParams.id);

  if (line == null) {
    return {
      line: null,
    };
  }

  const disruptions = getDemoDisruptions(app).filter((x) =>
    x.data.getImpactedLines(app).includes(line.id),
  );

  return {
    line: {
      name: line.name,
      calendar: createCalendarData(
        disruptions.map((x) => x.period),
        app.time.now(),
      ),
    },
  };
}

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
