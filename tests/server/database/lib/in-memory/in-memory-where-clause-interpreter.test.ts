import { describe, expect, it } from "vitest";
import { WhereClause } from "../../../../../server/database/lib/general/where-clause";
import { DatabaseModel } from "../../../../../server/database/lib/general/database-model";
import { InMemoryWhereClauseInterpreter } from "../../../../../server/database/lib/in-memory/in-memory-where-clause-interpreter";
import { InMemoryDatabaseItem } from "../../../../../server/database/lib/in-memory/in-memory-database-collection";
import { date } from "../../../../utils";

const obj1 = {
  id: 1,
  str: "value",
  date: date("2024-12-31T20:34:12Z"),
  bool: false,
  null: null,
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
      expect(matches(obj1, { id: 1 })).toBe(true);
      expect(matches(obj1, { id: 2 })).toBe(false);

      expect(matches(obj1, { str: "value" })).toBe(true);
      expect(matches(obj1, { str: "asdf" })).toBe(false);

      expect(matches(obj1, { date: date("2024-12-31T20:34:12Z") })).toBe(true);
      expect(matches(obj1, { date: date("2023-08-12T12:01:34Z") })).toBe(false);

      expect(matches(obj1, { bool: false })).toBe(true);
      expect(matches(obj1, { bool: true })).toBe(false);
    });

    it("handles type mismatches", () => {
      expect(matches(obj1, { bool: "value" })).toBe(false);
      expect(matches(obj1, { date: false })).toBe(false);
      expect(matches(obj1, { id: "1" })).toBe(false);
    });

    it("handles multiple values", () => {
      expect(matches(obj1, { id: 1, str: "value" })).toBe(true);
      expect(matches(obj1, { id: 2, str: "value" })).toBe(false);
      expect(matches(obj1, { id: 1, str: "something" })).toBe(false);
    });

    it("handles comparisons", () => {
      expect(matches(obj1, { id: { lt: 3 } })).toBe(true);
      expect(matches(obj1, { id: { lt: 1 } })).toBe(false);
      expect(matches(obj1, { id: { lte: 1 } })).toBe(true);
      expect(matches(obj1, { id: { gte: 1, lte: 1 } })).toBe(true);
      expect(matches(obj1, { id: { gt: 1 } })).toBe(false);
      expect(matches(obj1, { id: { gt: 0 } })).toBe(true);

      expect(
        matches(obj1, { date: { gte: date("2024-12-31T20:34:12Z") } }),
      ).toBe(true);
      expect(
        matches(obj1, { date: { lt: date("2024-12-31T20:34:12Z") } }),
      ).toBe(false);
      expect(
        matches(obj1, { date: { gt: date("2024-12-30T20:34:12Z") } }),
      ).toBe(true);
      expect(
        matches(obj1, { date: { gte: date("2025-01-01T00:00:00Z") } }),
      ).toBe(false);
    });

    it("handles not values", () => {
      expect(matches(obj1, { id: { not: 1 } })).toBe(false);
      expect(matches(obj1, { id: { not: 2 } })).toBe(true);

      expect(matches(obj1, { str: { not: "value" } })).toBe(false);
      expect(matches(obj1, { str: { not: "asdf" } })).toBe(true);

      expect(
        matches(obj1, { date: { not: date("2024-12-31T20:34:12Z") } }),
      ).toBe(false);
      expect(
        matches(obj1, { date: { not: date("2023-08-12T12:01:34Z") } }),
      ).toBe(true);

      expect(matches(obj1, { bool: { not: false } })).toBe(false);
      expect(matches(obj1, { bool: { not: true } })).toBe(true);

      // Type mismatches.
      expect(matches(obj1, { bool: { not: "value" } })).toBe(true);
      expect(matches(obj1, { date: { not: false } })).toBe(true);
      expect(
        matches(obj1, { bool: { not: date("2024-12-31T20:34:12Z") } }),
      ).toBe(true);
      expect(matches(obj1, { id: { not: "1" } })).toBe(true);
    });

    it("handles null checking", () => {
      expect(matches(obj1, { null: null })).toBe(true);
      expect(matches(obj1, { date: null })).toBe(false);
      expect(matches(obj1, { null: date("2024-12-31T20:34:12Z") })).toBe(false);
    });

    // TODO: [DS] Array length checking, contains checking, notContains checking.

    it("handles no filter", () => {
      expect(matches(obj1, undefined)).toBe(true);
      expect(matches(obj1, {})).toBe(true);
    });
  });
});
