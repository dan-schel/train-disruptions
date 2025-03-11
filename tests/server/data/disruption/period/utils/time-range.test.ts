import { describe, expect, it } from "vitest";
import { TimeRange } from "../../../../../../server/data/disruption/period/utils/time-range";

describe("TimeRange", () => {
  describe("#includes", () => {
    it("works", () => {
      const r1 = new TimeRange(
        new Date("2025-03-10T11:00:00+11:00"),
        new Date("2025-03-10T13:00:00+11:00"),
      );
      expect(r1.includes(new Date("2025-03-10T10:59:59+11:00"))).toBe(false);
      expect(r1.includes(new Date("2025-03-10T11:00:00+11:00"))).toBe(true);
      expect(r1.includes(new Date("2025-03-10T12:59:59+11:00"))).toBe(true);
      expect(r1.includes(new Date("2025-03-10T13:00:00+11:00"))).toBe(false);

      const r2 = new TimeRange(null, null);
      expect(r2.includes(new Date("2023-03-10T11:00:00+11:00"))).toBe(true);
      expect(r2.includes(new Date("2025-03-10T11:00:00+11:00"))).toBe(true);
      expect(r2.includes(new Date("2027-03-10T11:00:00+11:00"))).toBe(true);
    });
  });

  describe("#intersects", () => {
    it("works", () => {
      const r1 = new TimeRange(
        new Date("2025-03-10T11:00:00+11:00"),
        new Date("2025-03-10T13:00:00+11:00"),
      );

      const r2 = new TimeRange(
        new Date("2025-03-10T13:00:00+11:00"),
        new Date("2025-03-10T15:00:00+11:00"),
      );
      expect(r1.intersects(r2)).toBe(false);
      expect(r2.intersects(r1)).toBe(false);

      const r3 = new TimeRange(new Date("2025-03-10T10:00:00+11:00"), null);
      expect(r1.intersects(r3)).toBe(true);
      expect(r3.intersects(r1)).toBe(true);

      const r4 = new TimeRange(new Date("2025-03-10T14:00:00+11:00"), null);
      expect(r1.intersects(r4)).toBe(false);
      expect(r4.intersects(r1)).toBe(false);

      const r5 = new TimeRange(null, new Date("2025-03-10T12:00:00+11:00"));
      expect(r1.intersects(r5)).toBe(true);
      expect(r5.intersects(r1)).toBe(true);
    });
  });

  describe("#encompass", () => {
    it("works", () => {
      const r1 = new TimeRange(
        new Date("2025-03-10T11:00:00+11:00"),
        new Date("2025-03-10T13:00:00+11:00"),
      );
      const r2 = new TimeRange(
        new Date("2025-03-10T12:00:00+11:00"),
        new Date("2025-03-10T14:00:00+11:00"),
      );
      const r3 = new TimeRange(
        new Date("2025-03-10T17:00:00+11:00"),
        new Date("2025-03-10T19:00:00+11:00"),
      );
      const r4 = new TimeRange(
        new Date("2025-03-10T10:00:00+11:00"),
        new Date("2025-03-10T14:00:00+11:00"),
      );
      const r5 = new TimeRange(new Date("2025-03-10T14:00:00+11:00"), null);
      const r6 = new TimeRange(null, new Date("2025-03-10T10:00:00+11:00"));

      expect(TimeRange.encompass([r1])).toEqual(r1);
      expect(TimeRange.encompass([r1, r2])).toEqual(
        new TimeRange(
          new Date("2025-03-10T11:00:00+11:00"),
          new Date("2025-03-10T14:00:00+11:00"),
        ),
      );
      expect(TimeRange.encompass([r2, r1])).toEqual(
        new TimeRange(
          new Date("2025-03-10T11:00:00+11:00"),
          new Date("2025-03-10T14:00:00+11:00"),
        ),
      );
      expect(TimeRange.encompass([r3, r1])).toEqual(
        new TimeRange(
          new Date("2025-03-10T11:00:00+11:00"),
          new Date("2025-03-10T19:00:00+11:00"),
        ),
      );
      expect(TimeRange.encompass([r1, r4])).toEqual(
        new TimeRange(
          new Date("2025-03-10T10:00:00+11:00"),
          new Date("2025-03-10T14:00:00+11:00"),
        ),
      );
      expect(TimeRange.encompass([r1, r5])).toEqual(
        new TimeRange(new Date("2025-03-10T11:00:00+11:00"), null),
      );
      expect(TimeRange.encompass([r5, r6])).toEqual(new TimeRange(null, null));
      expect(TimeRange.encompass([r1, r2, r3, r4, r6])).toEqual(
        new TimeRange(null, new Date("2025-03-10T19:00:00+11:00")),
      );
    });

    it("throws unless at least one range is given", () => {
      expect(() => TimeRange.encompass([])).toThrow();
    });
  });
});
