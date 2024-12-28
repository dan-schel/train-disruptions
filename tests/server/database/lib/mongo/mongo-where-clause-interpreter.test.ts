import { describe, expect, it } from "vitest";
import { MongoWhereClauseInterpreter } from "../../../../../server/database/lib/mongo/mongo-where-clause-interpreter";
import { DatabaseModel } from "../../../../../server/database/lib/general/database-model";
import { WhereClause } from "../../../../../server/database/lib/general/where-clause";

const date1 = Date.parse("2024-12-28T12:00:00Z");
const date2 = Date.parse("2024-12-28T13:00:00Z");

describe("MongoWhereClauseInterpreter", () => {
  describe("toMongoFilter", () => {
    function filter(where: WhereClause<DatabaseModel> | undefined) {
      return new MongoWhereClauseInterpreter(where).toMongoFilter();
    }

    it("should handle equality for primitive values", () => {
      expect(filter({ a: 1 })).toStrictEqual({ a: 1 });
      expect(filter({ a: 1 })).toStrictEqual({ a: 1 });
      expect(filter({ a: "a" })).toStrictEqual({ a: "a" });
      expect(filter({ a: true })).toStrictEqual({ a: true });
      expect(filter({ a: date1 })).toStrictEqual({ a: date1 });
    });

    it("should handle multiple values", () => {
      expect(filter({ a: 1, b: "something" })).toStrictEqual({
        a: 1,
        b: "something",
      });
    });

    it("should handle comparisons", () => {
      expect(filter({ a: { gt: 4, lt: 7 } })).toStrictEqual({
        a: { $gt: 4, $lt: 7 },
      });
      expect(filter({ a: { gte: date1, lte: date2 } })).toStrictEqual({
        a: { $gte: date1, $lte: date2 },
      });
    });

    it("should handle not values", () => {
      expect(filter({ a: { not: "something" } })).toStrictEqual({
        a: { $ne: "something" },
      });
    });

    it("should handle null checking", () => {
      expect(filter({ a: null })).toStrictEqual({ a: null });
      expect(filter({ a: { not: null } })).toStrictEqual({
        a: { $ne: null },
      });
    });

    it("should handle array length checking", () => {
      expect(filter({ a: { length: { gt: 2 } } })).toStrictEqual({
        a: { $size: { $gt: 2 } },
      });
    });

    it("should handle array contains checking", () => {
      expect(filter({ a: { contains: "something" } })).toStrictEqual({
        a: { $in: "something" },
      });
      expect(filter({ a: { notContains: "something" } })).toStrictEqual({
        a: { $nin: "something" },
      });
    });

    it("should handle no filter", () => {
      expect(filter(undefined)).toStrictEqual({});
    });
  });
});