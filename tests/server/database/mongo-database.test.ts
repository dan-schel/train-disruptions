import { describe, expect, it } from "vitest";
import { MongoDatabase } from "../../../server/database/mongo-database";

const date1 = Date.parse("2024-12-28T12:00:00Z");
const date2 = Date.parse("2024-12-28T13:00:00Z");

describe("MongoDatabase", () => {
  describe("toMongoFilter", () => {
    it("should handle equality for primitive values", () => {
      expect(MongoDatabase.buildFilter({ a: 1 })).toStrictEqual({ a: 1 });
      expect(MongoDatabase.buildFilter({ a: 1 })).toStrictEqual({ a: 1 });
      expect(MongoDatabase.buildFilter({ a: "a" })).toStrictEqual({ a: "a" });
      expect(MongoDatabase.buildFilter({ a: true })).toStrictEqual({
        a: true,
      });
      expect(
        MongoDatabase.buildFilter({
          a: date1,
        }),
      ).toStrictEqual({ a: date1 });
    });

    it("should handle multiple values", () => {
      expect(MongoDatabase.buildFilter({ a: 1, b: "something" })).toStrictEqual(
        { a: 1, b: "something" },
      );
    });

    it("should handle comparisons", () => {
      expect(MongoDatabase.buildFilter({ a: { gt: 4, lt: 7 } })).toStrictEqual({
        a: { $gt: 4, $lt: 7 },
      });

      expect(
        MongoDatabase.buildFilter({ a: { gte: date1, lte: date2 } }),
      ).toStrictEqual({
        a: { $gte: date1, $lte: date2 },
      });
    });

    it("should handle not values", () => {
      expect(
        MongoDatabase.buildFilter({ a: { not: "something" } }),
      ).toStrictEqual({
        a: { $ne: "something" },
      });
    });

    it("should handle null checking", () => {
      expect(MongoDatabase.buildFilter({ a: null })).toStrictEqual({
        a: null,
      });
      expect(MongoDatabase.buildFilter({ a: { not: null } })).toStrictEqual({
        a: { $ne: null },
      });
    });

    it("should handle array length checking", () => {
      expect(
        MongoDatabase.buildFilter({ a: { length: { gt: 2 } } }),
      ).toStrictEqual({
        a: { $size: { $gt: 2 } },
      });
    });

    it("should handle array contains checking", () => {
      expect(
        MongoDatabase.buildFilter({ a: { contains: "something" } }),
      ).toStrictEqual({
        a: { $in: "something" },
      });
      expect(
        MongoDatabase.buildFilter({ a: { notContains: "something" } }),
      ).toStrictEqual({
        a: { $nin: "something" },
      });
    });
  });
});
