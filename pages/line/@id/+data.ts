import { PageContext } from "vike/types";
import { parseIntNull } from "@dan-schel/js-utils";
import { LineCollection } from "@/server/data/line/line-collection";
import { Line } from "@/server/data/line/line";
import { JsonSerializable } from "@/shared/json-serializable";
import { CalendarData } from "@/shared/types/calendar-data";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";

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

  const disruptions = [
    {
      from: new Date("2025-02-07T14:00:00Z"),
      to: new Date("2025-02-09T12:00:00Z"),
      evenings: false,
    },
    {
      from: new Date("2025-02-17T09:30:00Z"),
      to: new Date("2025-02-18T12:59:59Z"),
      evenings: true,
    },
    {
      from: new Date("2025-02-14T14:00:00Z"),
      to: new Date("2025-02-16T12:00:00Z"),
      evenings: false,
    },
    {
      from: new Date("2025-02-24T09:30:00Z"),
      to: new Date("2025-02-26T12:00:00Z"),
      evenings: true,
    },
    {
      from: new Date("2025-02-06T09:30:00Z"),
      to: new Date("2025-02-06T12:59:59Z"),
      evenings: true,
    },
  ];

  return {
    line: {
      name: line.name,
      calendar: toCalendarData(disruptions, app.time.now()),
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

// TEMPORARY: While we're bridging the gap between the demo data and real
// disruptions.
type Disruption = {
  from: Date;
  to: Date;
  evenings: boolean;
};
function toCalendarData(
  disruption: Disruption | Disruption[],
  now: Date,
): CalendarData {
  const array = Array.isArray(disruption) ? disruption : [disruption];
  const periods = array.map((x) =>
    x.evenings
      ? new EveningsOnlyDisruptionPeriod(x.from, new EndsExactly(x.to), 18)
      : new StandardDisruptionPeriod(x.from, new EndsExactly(x.to)),
  );

  return createCalendarData(periods, now);
}
