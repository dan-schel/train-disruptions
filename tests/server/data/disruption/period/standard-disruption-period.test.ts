import { describe, expect, it } from "vitest";
import { StandardDisruptionPeriod } from "../../../../../server/data/disruption/period/standard-disruption-period";
import { EndsExactly } from "../../../../../server/data/disruption/period/ends/ends-exactly";
import { EndsNever } from "../../../../../server/data/disruption/period/ends/ends-never";
import { expectCalendarMarks } from "./utils";

describe("StandardDisruptionPeriod", () => {
  describe("#getDisplayString", () => {
    it("works", () => {
      const period1 = new StandardDisruptionPeriod(
        new Date("2025-03-10T03:00:00+11:00"),
        new EndsExactly(new Date("2025-03-11T03:00:00+11:00")),
      );
      const period2 = new StandardDisruptionPeriod(
        new Date("2025-03-10T03:00:00+11:00"),
        new EndsNever(),
      );
      const period3 = new StandardDisruptionPeriod(null, new EndsNever());
      const period4 = new StandardDisruptionPeriod(
        new Date("2025-03-10T03:00:00+11:00"),
        new EndsExactly(new Date("2026-03-11T18:00:00+11:00")),
      );
      const now = new Date("2025-03-10T10:48:39+11:00");

      expect(period1.getDisplayString({ now })).toBe(
        "3:00am Mon 10th Mar until 3:00am Tue 11th Mar",
      );
      expect(period2.getDisplayString({ now })).toBe(
        "3:00am Mon 10th Mar until further notice",
      );
      expect(period3.getDisplayString({ now })).toBe("until further notice");
      expect(period4.getDisplayString({ now })).toBe(
        "3:00am Mon 10th Mar until 6:00pm Wed 11th Mar 2026",
      );
    });
  });

  describe("#getCalendarMark", () => {
    it("works", () => {
      expectCalendarMarks(
        new StandardDisruptionPeriod(
          new Date("2025-03-10T03:00:00+11:00"),
          new EndsExactly(new Date("2025-03-11T03:00:00+11:00")),
        ),
        "2025-03-09",
        "2025-03-11",
        ["no-disruption", "all-day", "no-disruption"],
      );

      expectCalendarMarks(
        new StandardDisruptionPeriod(
          new Date("2025-03-10T02:59:59+11:00"),
          new EndsExactly(new Date("2025-03-11T03:00:01+11:00")),
        ),
        "2025-03-08",
        "2025-03-12",
        [
          "no-disruption",
          "evening-only",
          "all-day",
          "all-day",
          "no-disruption",
        ],
      );

      expectCalendarMarks(
        new StandardDisruptionPeriod(
          new Date("2025-03-09T18:00:00+11:00"),
          new EndsExactly(new Date("2025-03-11T03:00:00+11:00")),
        ),
        "2025-03-08",
        "2025-03-11",
        ["no-disruption", "evening-only", "all-day", "no-disruption"],
      );

      expectCalendarMarks(
        new StandardDisruptionPeriod(
          new Date("2025-03-09T17:59:59+11:00"),
          new EndsExactly(new Date("2025-03-11T03:00:00+11:00")),
        ),
        "2025-03-08",
        "2025-03-11",
        ["no-disruption", "all-day", "all-day", "no-disruption"],
      );
    });
  });

  describe("#getFullyEncompassingTimeRange", () => {
    it("works", () => {
      const period1 = new StandardDisruptionPeriod(
        new Date("2025-03-10T03:00:00+11:00"),
        new EndsExactly(new Date("2025-03-11T03:00:00+11:00")),
      );
      const period2 = new StandardDisruptionPeriod(null, new EndsNever());

      expect(period1.getFullyEncompassingTimeRange().start).toEqual(
        new Date("2025-03-10T03:00:00+11:00"),
      );
      expect(period1.getFullyEncompassingTimeRange().end).toEqual(
        new Date("2025-03-11T03:00:00+11:00"),
      );

      expect(period2.getFullyEncompassingTimeRange().start).toBeNull();
      expect(period2.getFullyEncompassingTimeRange().end).toBeNull();
    });
  });
});
