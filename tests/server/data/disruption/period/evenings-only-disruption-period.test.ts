import { describe, expect, it } from "vitest";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { EndsNever } from "@/server/data/disruption/period/ends/ends-never";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { expectCalendarMarks } from "@/tests/server/data/disruption/period/utils";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";

describe("EveningsOnlyDisruptionPeriod", () => {
  it("doesn't allow startHourEachDay to be invalid", () => {
    expect(() => period(null, null, 18)).not.toThrow();
    expect(() => period(null, null, 23)).not.toThrow();
    expect(() => period(null, null, 17)).toThrow();
    expect(() => period(null, null, 24)).toThrow();
    expect(() => period(null, null, 1)).toThrow();
    expect(() => period(null, null, 19.5)).toThrow();
  });

  it("doesn't allow startMinuteEachDay to be invalid", () => {
    expect(() => period(null, null, 18, 30)).not.toThrow();
    expect(() => period(null, null, 20, 59)).not.toThrow();
    expect(() => period(null, null, 23, 0)).not.toThrow();
    expect(() => period(null, null, 17, 60)).toThrow();
    expect(() => period(null, null, 21, -1)).toThrow();
    expect(() => period(null, null, 19, 30.5)).toThrow();
  });

  describe("#getDisplayString", () => {
    it("works", () => {
      const period1 = period("2025-03-10T21:00:00", "2025-03-14T03:00:00", 21);
      const period2 = period(
        "2025-03-10T21:05:00",
        "2025-03-14T03:00:00",
        21,
        5,
      );
      const now = new Date("2025-03-10T11:50:35+11:00");

      // TODO: This would ideally be "9pm to last service each night, Mon 10th
      // Mar to Thu 14th Mar".
      const expectedStr1 =
        "9pm to last service each night, starting 9:00pm Mon 10th Mar until " +
        "3:00am Fri 14th Mar";

      const expectedStr2 =
        "9:05pm to last service each night, starting 9:05pm Mon 10th Mar until " +
        "3:00am Fri 14th Mar";

      expect(period1.getDisplayString({ now })).toBe(expectedStr1);
      expect(period2.getDisplayString({ now })).toBe(expectedStr2);
    });
  });

  describe("#getCalendarMark", () => {
    it("works", () => {
      expectCalendarMarks(
        period("2025-03-10T21:00:00", "2025-03-12T03:00:00", 21),
        "2025-03-09",
        "2025-03-12",
        ["no-disruption", "evening-only", "evening-only", "no-disruption"],
      );
    });

    it("ignores additional time outside the evening period", () => {
      expectCalendarMarks(
        period("2025-03-10T15:00:00", "2025-03-12T08:00:00", 21),
        "2025-03-09",
        "2025-03-12",
        ["no-disruption", "evening-only", "evening-only", "no-disruption"],
      );

      expectCalendarMarks(
        period("2025-03-10T15:00:00", "2025-03-12T20:00:00", 21),
        "2025-03-09",
        "2025-03-12",
        ["no-disruption", "evening-only", "evening-only", "no-disruption"],
      );
    });
  });

  describe("#intersects", () => {
    it("works", () => {
      const p1 = period("2025-03-10T18:00:00", "2025-03-12T03:00:00", 18);
      expectToNotIntersect(p1, "2025-03-11T03:00:00", "2025-03-11T18:00:00");
      expectToIntersect(p1, "2025-03-11T02:59:59", "2025-03-11T18:00:00");
      expectToIntersect(p1, "2025-03-11T03:00:00", "2025-03-11T18:00:01");
      expectToIntersect(p1, "2025-03-09T00:00:00", null);
      expectToIntersect(p1, "2025-03-11T12:00:00", null);
      expectToIntersect(p1, null, "2025-03-11T12:00:00");

      const p2 = period("2025-03-10T18:30:00", "2025-03-12T03:00:00", 18, 30);
      expectToNotIntersect(p2, "2025-03-11T03:00:00", "2025-03-11T18:30:00");
      expectToIntersect(p2, "2025-03-11T02:59:59", "2025-03-11T18:30:00");
      expectToIntersect(p2, "2025-03-11T03:00:00", "2025-03-11T18:30:01");
      expectToIntersect(p2, "2025-03-09T00:00:00", null);
      expectToIntersect(p2, "2025-03-11T12:00:00", null);
      expectToIntersect(p2, null, "2025-03-11T12:00:00");
    });

    it("handles start/end times well", () => {
      const p1 = period("2025-03-10T15:00:00", "2025-03-12T20:00:00", 19);
      expectToNotIntersect(p1, "2025-03-10T15:00:00", "2025-03-10T19:00:00");
      expectToIntersect(p1, "2025-03-10T15:00:00", "2025-03-10T19:00:01");
      expectToNotIntersect(p1, "2025-03-12T20:00:00", "2025-03-15T00:00:00");
      expectToIntersect(p1, "2025-03-12T19:59:59", "2025-03-15T00:00:00");

      const p2 = period("2025-03-10T22:00:00", "2025-03-12T20:00:00", 18);
      expectToNotIntersect(p2, "2025-03-10T18:00:00", "2025-03-10T22:00:00");
      expectToIntersect(p2, "2025-03-10T18:00:00", "2025-03-10T22:00:01");
      expectToNotIntersect(p2, "2025-03-12T20:00:00", "2025-03-15T00:00:00");
      expectToIntersect(p2, "2025-03-12T19:59:59", "2025-03-15T00:00:00");

      const p3 = period("2025-03-14T16:45:00", "2025-03-16T22:00:00", 19, 30);
      expectToNotIntersect(p3, "2025-03-14T16:45:00", "2025-03-14T19:30:00");
      expectToIntersect(p3, "2025-03-14T16:45:00", "2025-03-14T19:30:01");
      expectToNotIntersect(p3, "2025-03-16T22:00:00", "2025-03-18T00:00:00");
      expectToIntersect(p3, "2025-03-16T21:59:59", "2025-03-18T00:00:00");

      const p4 = period("2025-03-14T22:30:00", "2025-03-16T22:00:00", 18, 15);
      expectToNotIntersect(p4, "2025-03-14T16:45:00", "2025-03-14T22:30:00");
      expectToIntersect(p4, "2025-03-14T16:45:00", "2025-03-14T22:30:01");
      expectToNotIntersect(p4, "2025-03-16T22:00:00", "2025-03-18T00:00:00");
      expectToIntersect(p4, "2025-03-16T21:59:59", "2025-03-18T00:00:00");
    });

    it("works when start/end is null", () => {
      const p1 = period(null, null, 20);
      expectToNotIntersect(p1, "2026-03-11T03:00:00", "2026-03-11T20:00:00");
      expectToIntersect(p1, "2026-03-11T02:59:59", "2026-03-11T20:00:00");
      expectToIntersect(p1, "2026-03-11T03:00:00", "2026-03-11T20:00:01");
      expectToIntersect(p1, "2026-03-11T12:00:00", null);
      expectToIntersect(p1, null, "2026-03-11T12:00:00");
      expectToIntersect(p1, null, null);

      const p2 = period(null, null, 21, 5);
      expectToNotIntersect(p2, "2026-03-14T03:00:00", "2026-03-14T21:05:00");
      expectToIntersect(p2, "2026-03-14T02:59:59", "2026-03-14T21:05:00");
      expectToIntersect(p2, "2026-03-14T03:00:00", "2026-03-14T21:05:01");
      expectToIntersect(p2, "2026-03-14T03:00:00", null);
      expectToIntersect(p2, null, "2026-03-14T21:05:00");
      expectToIntersect(p2, null, null);
    });

    function intersects(
      period: EveningsOnlyDisruptionPeriod,
      start: string | null,
      end: string | null,
    ) {
      const rangeStart = start != null ? new Date(start + "+11:00") : null;
      const rangeEnd = end != null ? new Date(end + "+11:00") : null;
      return period.intersects(new TimeRange(rangeStart, rangeEnd));
    }

    function expectToIntersect(
      period: EveningsOnlyDisruptionPeriod,
      start: string | null,
      end: string | null,
    ) {
      expect(intersects(period, start, end)).toBe(true);
    }

    function expectToNotIntersect(
      period: EveningsOnlyDisruptionPeriod,
      start: string | null,
      end: string | null,
    ) {
      expect(intersects(period, start, end)).toBe(false);
    }
  });

  describe("#occursAt", () => {
    it("works", () => {
      const p1 = period("2025-03-10T18:00:00", "2025-03-12T03:00:00", 18);
      expect(p1.occursAt(new Date("2025-03-10T17:59:59+11:00"))).toBe(false);
      expect(p1.occursAt(new Date("2025-03-10T18:00:00+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2025-03-11T02:59:59+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2025-03-11T03:00:00+11:00"))).toBe(false);
      expect(p1.occursAt(new Date("2025-03-11T17:59:59+11:00"))).toBe(false);
      expect(p1.occursAt(new Date("2025-03-11T18:00:00+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2025-03-12T02:59:59+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2025-03-12T03:00:00+11:00"))).toBe(false);

      const p2 = period("2025-03-11T18:15:00", "2025-03-13T03:00:00", 18, 15);
      expect(p2.occursAt(new Date("2025-03-11T18:00:00+11:00"))).toBe(false);
      expect(p2.occursAt(new Date("2025-03-11T18:14:59+11:00"))).toBe(false);
      expect(p2.occursAt(new Date("2025-03-11T18:15:00+11:00"))).toBe(true);
      expect(p2.occursAt(new Date("2025-03-11T18:15:33+11:00"))).toBe(true);
      expect(p2.occursAt(new Date("2025-03-11T18:16:00+11:00"))).toBe(true);
      expect(p2.occursAt(new Date("2025-03-11T03:00:00+11:00"))).toBe(false);
    });

    it("handles start/end times well", () => {
      const p1 = period("2025-03-10T15:00:00", "2025-03-12T20:00:00", 19);
      expect(p1.occursAt(new Date("2025-03-10T18:59:59+11:00"))).toBe(false);
      expect(p1.occursAt(new Date("2025-03-10T19:00:00+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2025-03-12T19:59:59+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2025-03-12T20:00:00+11:00"))).toBe(false);

      const p2 = period("2025-03-10T22:00:00", "2025-03-12T20:00:00", 18);
      expect(p2.occursAt(new Date("2025-03-10T21:59:59+11:00"))).toBe(false);
      expect(p2.occursAt(new Date("2025-03-10T22:00:00+11:00"))).toBe(true);

      const p3 = period("2025-03-11T16:00:00", "2025-03-13T21:00:00", 18, 59);
      expect(p3.occursAt(new Date("2025-03-11T16:00:01+11:00"))).toBe(false);
      expect(p3.occursAt(new Date("2025-03-11T18:58:99+11:00"))).toBe(false);
      expect(p3.occursAt(new Date("2025-03-11T18:59:00+11:00"))).toBe(true);

      const p4 = period("2025-03-10T22:15:00", "2025-03-12T20:00:00", 19, 14);
      expect(p4.occursAt(new Date("2025-03-10T22:14:59+11:00"))).toBe(false);
      expect(p4.occursAt(new Date("2025-03-10T22:15:00+11:00"))).toBe(true);
    });

    it("works when start/end is null", () => {
      const p1 = period(null, null, 20);
      expect(p1.occursAt(new Date("2026-03-10T19:59:59+11:00"))).toBe(false);
      expect(p1.occursAt(new Date("2026-03-10T20:00:00+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2026-03-11T02:59:59+11:00"))).toBe(true);
      expect(p1.occursAt(new Date("2026-03-11T03:00:00+11:00"))).toBe(false);

      const p2 = period(null, null, 20, 47);
      expect(p2.occursAt(new Date("2026-03-10T20:46:59+11:00"))).toBe(false);
      expect(p2.occursAt(new Date("2026-03-10T20:47:00+11:00"))).toBe(true);
      expect(p2.occursAt(new Date("2026-03-11T02:59:59+11:00"))).toBe(true);
      expect(p2.occursAt(new Date("2026-03-11T03:00:00+11:00"))).toBe(false);
    });
  });

  describe("#getFullyEncompassingTimeRange", () => {
    it("works", () => {
      expectTimeRange(
        period("2025-03-10T19:00:00", "2025-03-12T03:00:00", 19),
        "2025-03-10T19:00:00",
        "2025-03-12T03:00:00",
      );
      expectTimeRange(
        period("2025-03-10T15:30:00", "2025-03-12T18:30:00", 19),
        "2025-03-10T19:00:00",
        "2025-03-12T03:00:00",
      );
      expectTimeRange(
        period("2025-03-10T20:00:00", "2025-03-12T23:00:00", 19),
        "2025-03-10T20:00:00",
        "2025-03-12T23:00:00",
      );
      expectTimeRange(
        period(null, "2025-03-12T12:00:00", 19),
        null,
        "2025-03-12T03:00:00",
      );
      expectTimeRange(
        period("2025-03-10T12:00:00", null, 19),
        "2025-03-10T19:00:00",
        null,
      );
      expectTimeRange(period(null, null, 19), null, null);
      expectTimeRange(
        period("2025-03-11T16:00:00", "2025-03-13T03:00:00", 18, 53),
        "2025-03-11T18:53:00",
        "2025-03-13T03:00:00",
      );
      expectTimeRange(
        period("2025-03-11T20:17:00", "2025-03-13T03:00:00", 18, 53),
        "2025-03-11T20:17:00",
        "2025-03-13T03:00:00",
      );
      expectTimeRange(
        period("2025-03-11T12:00:00", null, 18, 53),
        "2025-03-11T18:53:00",
        null,
      );
    });

    function expectTimeRange(
      period: EveningsOnlyDisruptionPeriod,
      start: string | null,
      end: string | null,
    ) {
      const expectedStart = start != null ? new Date(start + "+11:00") : null;
      const expectedEnd = end != null ? new Date(end + "+11:00") : null;
      const expected = new TimeRange(expectedStart, expectedEnd);
      expect(period.getFullyEncompassingTimeRange()).toEqual(expected);
    }
  });

  function period(
    start: string | null,
    end: string | null,
    startHourEachDay: number,
    startMinuteEachDay?: number,
  ) {
    return new EveningsOnlyDisruptionPeriod(
      start != null ? new Date(start + "+11:00") : null,
      end != null ? new EndsExactly(new Date(end + "+11:00")) : new EndsNever(),
      startHourEachDay,
      startMinuteEachDay,
    );
  }
});
