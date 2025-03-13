import { expect } from "vitest";
import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { CalendarMark } from "@/server/data/disruption/period/disruption-period-base";

export function expectCalendarMarks(
  period: DisruptionPeriod,
  from: string,
  to: string,
  marks: CalendarMark[],
) {
  const fromDate = JustDate.extractFromDate(new Date(from));
  const toDate = JustDate.extractFromDate(new Date(to));

  const actual = [];
  for (let date = fromDate; date.diff(toDate) <= 0; date = date.add(1)) {
    actual.push(period.getCalendarMark(date));
  }

  expect(actual).toEqual(marks);
}
