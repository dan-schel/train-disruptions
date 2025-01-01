import { describe, expect, it } from "vitest";
import { WhereClause } from "../../../../../server/database/lib/general/where-clause";
import { DatabaseModel } from "../../../../../server/database/lib/general/database-model";
import { InMemoryWhereClauseInterpreter } from "../../../../../server/database/lib/in-memory/in-memory-where-clause-interpreter";
import { InMemoryDatabaseItem } from "../../../../../server/database/lib/in-memory/in-memory-database-collection";
import { date } from "../../../../utils";

const obj = {
  id: 1,
  str: "value",
  date: date("2024-12-31T20:34:12Z"),
  bool: false,
  null: null,
  array: ["a", "b", "c"],
};

describe("InMemoryWhereClauseInterpreter", () => {
  describe("matches", () => {
    function matches(
      obj: InMemoryDatabaseItem,
      where: WhereClause<DatabaseModel> | undefined,
    ) {
      return new InMemoryWhereClauseInterpreter(where).matches(obj);
    }

    it("handles equality for primitive values", () => {
      expect(matches(obj, { id: 1 })).toBe(true);
      expect(matches(obj, { id: 2 })).toBe(false);

      expect(matches(obj, { str: "value" })).toBe(true);
      expect(matches(obj, { str: "asdf" })).toBe(false);

      expect(matches(obj, { date: date("2024-12-31T20:34:12Z") })).toBe(true);
      expect(matches(obj, { date: date("2023-08-12T12:01:34Z") })).toBe(false);

      expect(matches(obj, { bool: false })).toBe(true);
      expect(matches(obj, { bool: true })).toBe(false);
    });

    it("handles type mismatches", () => {
      expect(matches(obj, { bool: "value" })).toBe(false);
      expect(matches(obj, { date: false })).toBe(false);
      expect(matches(obj, { id: "1" })).toBe(false);
      expect(matches(obj, { id: { contains: "1" } })).toBe(false);
      expect(matches(obj, { array: false })).toBe(false);
    });

    it("handles multiple values", () => {
      expect(matches(obj, { id: 1, str: "value" })).toBe(true);
      expect(matches(obj, { id: 2, str: "value" })).toBe(false);
      expect(matches(obj, { id: 1, str: "something" })).toBe(false);
    });

    it("handles comparisons", () => {
      expect(matches(obj, { id: { lt: 3 } })).toBe(true);
      expect(matches(obj, { id: { lt: 1 } })).toBe(false);
      expect(matches(obj, { id: { lte: 1 } })).toBe(true);
      expect(matches(obj, { id: { gte: 1, lte: 1 } })).toBe(true);
      expect(matches(obj, { id: { gt: 1 } })).toBe(false);
      expect(matches(obj, { id: { gt: 0 } })).toBe(true);

      expect(
        matches(obj, { date: { gte: date("2024-12-31T20:34:12Z") } }),
      ).toBe(true);
      expect(matches(obj, { date: { lt: date("2024-12-31T20:34:12Z") } })).toBe(
        false,
      );
      expect(matches(obj, { date: { gt: date("2024-12-30T20:34:12Z") } })).toBe(
        true,
      );
      expect(
        matches(obj, { date: { gte: date("2025-01-01T00:00:00Z") } }),
      ).toBe(false);
    });

    it("handles not values", () => {
      expect(matches(obj, { id: { not: 1 } })).toBe(false);
      expect(matches(obj, { id: { not: 2 } })).toBe(true);

      expect(matches(obj, { str: { not: "value" } })).toBe(false);
      expect(matches(obj, { str: { not: "asdf" } })).toBe(true);

      expect(
        matches(obj, { date: { not: date("2024-12-31T20:34:12Z") } }),
      ).toBe(false);
      expect(
        matches(obj, { date: { not: date("2023-08-12T12:01:34Z") } }),
      ).toBe(true);

      expect(matches(obj, { bool: { not: false } })).toBe(false);
      expect(matches(obj, { bool: { not: true } })).toBe(true);

      // Type mismatches.
      expect(matches(obj, { bool: { not: "value" } })).toBe(true);
      expect(matches(obj, { date: { not: false } })).toBe(true);
      expect(
        matches(obj, { bool: { not: date("2024-12-31T20:34:12Z") } }),
      ).toBe(true);
      expect(matches(obj, { id: { not: "1" } })).toBe(true);
    });

    it("handles null checking", () => {
      expect(matches(obj, { null: null })).toBe(true);
      expect(matches(obj, { date: null })).toBe(false);
      expect(matches(obj, { null: date("2024-12-31T20:34:12Z") })).toBe(false);
    });

    it("handles array length checking", () => {
      expect(matches(obj, { array: { length: 3 } })).toBe(true);
      expect(matches(obj, { array: { length: 2 } })).toBe(false);
      expect(matches(obj, { array: { length: { gt: 2 } } })).toBe(true);
      expect(matches(obj, { array: { length: { gt: 3 } } })).toBe(false);
    });

    it("handles array contains checking", () => {
      expect(matches(obj, { array: { contains: "a" } })).toBe(true);
      expect(matches(obj, { array: { contains: "d" } })).toBe(false);
      expect(matches(obj, { array: { notContains: "a" } })).toBe(false);
      expect(matches(obj, { array: { notContains: "d" } })).toBe(true);
    });

    it("handles no filter", () => {
      expect(matches(obj, undefined)).toBe(true);
      expect(matches(obj, {})).toBe(true);
    });
  });
});
