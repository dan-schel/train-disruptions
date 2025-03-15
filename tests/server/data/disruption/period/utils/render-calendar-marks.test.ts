import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import {
  daysToRenderOnCalendar,
  renderCalendarMarks,
} from "@/server/data/disruption/period/utils/render-calendar-marks";
import { RenderedCalendarMark } from "@/shared/types/calendar-marks";
import { describe, expect, it } from "vitest";

describe("#renderCalendarMarks", () => {
  it("works", () => {
    const result = renderCalendarMarks(
      [
        regular("2025-03-12", "2025-03-15"),
        evenings("2025-03-20", "2025-03-25"),
        regular("2025-03-24", "2025-03-26"),
        regular("2025-04-10", "2025-04-30"),
      ],
      new Date("2025-03-15T08:00:00+11:00"),
    );
    expect(result.length).toBe(daysToRenderOnCalendar);
    expect(result.map(toSnapshotString).join("\n")).toMatchSnapshot();
  });

  it("works with no periods given", () => {
    const result = renderCalendarMarks(
      [],
      new Date("2025-03-15T08:00:00+11:00"),
    );
    expect(result.length).toBe(daysToRenderOnCalendar);
    expect(result.every((x) => x.mark === "no-disruption")).toBe(true);
  });

  it("handles timezones correctly", () => {
    const result1 = renderCalendarMarks(
      [],
      new Date("2025-03-15T23:59:59+11:00"),
    );
    const result2 = renderCalendarMarks(
      [],
      new Date("2025-03-16T00:00:00+11:00"),
    );

    expect(result1.length).toBe(daysToRenderOnCalendar);
    expect(result1[0].year).toBe(2025);
    expect(result1[0].month).toBe(3);
    expect(result1[0].day).toBe(15);
    expect(result2.length).toBe(daysToRenderOnCalendar);
    expect(result2[0].year).toBe(2025);
    expect(result2[0].month).toBe(3);
    expect(result2[0].day).toBe(16);
  });

  function regular(from: string, to: string) {
    return new StandardDisruptionPeriod(
      new Date(from + "T05:00:00+11:00"),
      new EndsExactly(new Date(to + "T22:00:00+11:00")),
    );
  }

  function evenings(from: string, to: string) {
    return new EveningsOnlyDisruptionPeriod(
      new Date(from + "T05:00:00+11:00"),
      new EndsExactly(new Date(to + "T22:00:00+11:00")),
      18,
    );
  }

  function toSnapshotString(mark: RenderedCalendarMark): string {
    return `${pad(mark.year, 4)}-${pad(mark.month, 2)}-${pad(mark.day, 2)} ${mark.mark}`;
  }

  function pad(value: number, digits: number): string {
    return value.toFixed().padStart(digits, "0");
  }
});
