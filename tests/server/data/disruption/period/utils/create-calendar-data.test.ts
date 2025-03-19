import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import {
  daysToRenderOnCalendar,
  createCalendarData,
} from "@/server/data/disruption/period/utils/create-calendar-data";
import { CalendarCellData } from "@/shared/types/calendar-data";
import { describe, expect, it } from "vitest";

describe("#createCalendarData", () => {
  it("works", () => {
    const result = createCalendarData(
      [
        regular("2025-03-12", "2025-03-15"),
        evenings("2025-03-20", "2025-03-25"),
        regular("2025-03-24", "2025-03-26"),
        regular("2025-04-10", "2025-04-30"),
      ],
      new Date("2025-03-15T08:00:00+11:00"),
    );
    expect(result.cells.length).toBe(daysToRenderOnCalendar);
    expect(result.cells.map(toSnapshotString).join("\n")).toMatchSnapshot();
  });

  it("works with no periods given", () => {
    const result = createCalendarData(
      [],
      new Date("2025-03-15T08:00:00+11:00"),
    );
    expect(result.cells.length).toBe(daysToRenderOnCalendar);
    expect(result.cells.every((x) => x.mark === "no-disruption")).toBe(true);
  });

  it("handles timezones correctly", () => {
    const result1 = createCalendarData(
      [],
      new Date("2025-03-15T23:59:59+11:00"),
    );
    expect(result1.today).toEqual({ year: 2025, month: 3, day: 15 });
    expect(result1.cells.length).toBe(daysToRenderOnCalendar);
    expect(result1.cells[0].year).toBe(2025);
    expect(result1.cells[0].month).toBe(3);
    expect(result1.cells[0].day).toBe(15);

    const result2 = createCalendarData(
      [],
      new Date("2025-03-16T00:00:00+11:00"),
    );
    expect(result2.today).toEqual({ year: 2025, month: 3, day: 16 });
    expect(result2.cells.length).toBe(daysToRenderOnCalendar);
    expect(result2.cells[0].year).toBe(2025);
    expect(result2.cells[0].month).toBe(3);
    expect(result2.cells[0].day).toBe(16);
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

  function toSnapshotString(mark: CalendarCellData): string {
    return `${pad(mark.year, 4)}-${pad(mark.month, 2)}-${pad(mark.day, 2)} ${mark.mark}`;
  }

  function pad(value: number, digits: number): string {
    return value.toFixed().padStart(digits, "0");
  }
});
