import { assert, describe, expect, it } from "vitest";
import { CalendarMark } from "../../../../../server/data/disruption/period/calendar-mark";

describe("CalendarMark", () => {
  describe("buildList", () => {
    it("works", () => {
      expectMarks(
        CalendarMark.buildList(
          new Date("2025-03-07T20:00:00+11:00"),
          new Date("2025-03-10T03:00:00+11:00"),
        ),
        ["2025-03-07 evening", "2025-03-08", "2025-03-09"],
      );

      expectMarks(
        CalendarMark.buildList(
          new Date("2025-03-07T17:59:00+11:00"),
          new Date("2025-03-08T03:00:00+11:00"),
        ),
        ["2025-03-07"],
      );

      expectMarks(
        CalendarMark.buildList(
          new Date("2025-03-07T18:00:00+11:00"),
          new Date("2025-03-08T03:00:00+11:00"),
        ),
        ["2025-03-07 evening"],
      );

      expectMarks(
        CalendarMark.buildList(
          new Date("2025-03-07T18:00:00+11:00"),
          new Date("2025-03-08T03:01:00+11:00"),
        ),
        ["2025-03-07 evening", "2025-03-08"],
      );
    });

    it("rejects invalid ranges", () => {
      expect(() =>
        CalendarMark.buildList(
          new Date("2025-03-07T15:00:00+11:00"),
          new Date("2025-03-07T15:00:00+11:00"),
        ),
      ).toThrow();

      expect(() =>
        CalendarMark.buildList(
          new Date("2025-03-07T15:00:00+11:00"),
          new Date("2025-03-07T14:59:00+11:00"),
        ),
      ).toThrow();
    });

    function expectMarks(marks: CalendarMark[], expected: string[]) {
      expected.forEach((e, i) => {
        const actual = marks[i];
        const actualDate = `${pad(actual.year, 4)}-${pad(actual.month, 2)}-${pad(actual.day, 2)}`;
        const actualStringified = actual.eveningOnly
          ? `${actualDate} evening`
          : actualDate;
        assert(
          e === actualStringified,
          `Expected "${e}", got "${actualStringified}".`,
        );
      });

      assert(
        marks.length === expected.length,
        `Expected ${expected.length} marks, got ${marks.length}.`,
      );
    }

    function pad(input: number, digits: number) {
      return input.toFixed().padStart(digits, "0");
    }
  });
});
