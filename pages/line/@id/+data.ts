import { PageContext } from "vike/types";
import { parseIntNull } from "@dan-schel/js-utils";
import { LineCollection } from "@/server/data/line/line-collection";
import { Line } from "@/server/data/line/line";
import { JsonSerializable } from "@/shared/json-serializable";
import { CalendarData } from "@/shared/types/calendar-data";
import { createCalendarData } from "@/server/data/disruption/period/utils/create-calendar-data";
import { getDemoDisruptions } from "@/server/data/disruption/demo-disruptions";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";
import {
  LineStatusIndicatorPriorities,
  LineStatusIndicatorPriority,
} from "@/server/data/disruption/writeup/disruption-writeup";
import { Disruption } from "@/server/data/disruption/disruption";
import {
  LinePageActiveDisruption,
  LinePageStatusColour,
  LinePageUpcomingDisruption,
} from "@/shared/types/line-page";

const statusColorMapping: Record<
  LineStatusIndicatorPriority,
  LinePageStatusColour
> = {
  "very-low": "text-status-yellow",
  low: "text-status-yellow",
  medium: "text-status-red",
  high: "text-status-red",
  hidden: "text-status-green",
};

export type Data = {
  line: {
    id: number;
    name: string;
    calendar: CalendarData;
    active: LinePageActiveDisruption[];
    upcoming: LinePageUpcomingDisruption[];
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

  // Filter out disruptions from the past and sort by priority
  const disruptions = getDemoDisruptions(app)
    .filter(
      (x) =>
        x.data.getImpactedLines(app).includes(line.id) &&
        x.data.getWriteupAuthor().write(app, x).lineStatusIndicator.priority !==
          "hidden" &&
        x.period.intersects(new TimeRange(app.time.now(), null)),
    )
    .sort(
      (a, b) =>
        LineStatusIndicatorPriorities.indexOf(
          b.data.getWriteupAuthor().write(app, b).lineStatusIndicator.priority,
        ) -
        LineStatusIndicatorPriorities.indexOf(
          a.data.getWriteupAuthor().write(app, a).lineStatusIndicator.priority,
        ),
    );

  // Split the disruptions that occur today from the ones that occur in the future
  const [today, future] = disruptions.reduce<[Disruption[], Disruption[]]>(
    (groups, x) => {
      if (x.period.occursAt(app.time.now())) {
        groups[0].push(x);
      } else {
        groups[1].push(x);
      }

      return groups;
    },
    [[], []],
  );

  const active = today.map((x) => {
    const writeup = x.data.getWriteupAuthor().write(app, x);

    return {
      id: x.id,
      headline: writeup.summary.headline,
      subject: writeup.summary.subject,
      period: writeup.summary.period,
      colour: statusColorMapping[writeup.lineStatusIndicator.priority],
    };
  });

  const upcoming = future
    .sort(
      (a, b) =>
        (a.period.getFullyEncompassingTimeRange().start?.getTime() ?? 0) -
        (b.period.getFullyEncompassingTimeRange().start?.getTime() ?? 0),
    )
    .map((x) => {
      const writeup = x.data.getWriteupAuthor().write(app, x);

      return {
        id: x.id,
        headline: writeup.summary.headline,
        subject: writeup.summary.subject,
        period: writeup.summary.period,
      };
    });

  return {
    line: {
      id: line.id,
      name: line.name,
      calendar: createCalendarData(
        disruptions.map((x) => x.period),
        app.time.now(),
      ),
      active,
      upcoming,
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
