import { describe, expect, it } from "vitest";
import { buildFilter } from "../../../../server/database/mongo/build-filter";

const date1 = Date.parse("2024-12-28T12:00:00Z");
const date2 = Date.parse("2024-12-28T13:00:00Z");

describe("buildFilter", () => {
  it("should handle equality for primitive values", () => {
    expect(buildFilter({ a: 1 })).toStrictEqual({ a: 1 });
    expect(buildFilter({ a: 1 })).toStrictEqual({ a: 1 });
    expect(buildFilter({ a: "a" })).toStrictEqual({ a: "a" });
    expect(buildFilter({ a: true })).toStrictEqual({ a: true });
    expect(buildFilter({ a: date1 })).toStrictEqual({ a: date1 });
  });

  it("should handle multiple values", () => {
    expect(buildFilter({ a: 1, b: "something" })).toStrictEqual({
      a: 1,
      b: "something",
    });
  });

  it("should handle comparisons", () => {
    expect(buildFilter({ a: { gt: 4, lt: 7 } })).toStrictEqual({
      a: { $gt: 4, $lt: 7 },
    });
    expect(buildFilter({ a: { gte: date1, lte: date2 } })).toStrictEqual({
      a: { $gte: date1, $lte: date2 },
    });
  });

  it("should handle not values", () => {
    expect(buildFilter({ a: { not: "something" } })).toStrictEqual({
      a: { $ne: "something" },
    });
  });

  it("should handle null checking", () => {
    expect(buildFilter({ a: null })).toStrictEqual({ a: null });
    expect(buildFilter({ a: { not: null } })).toStrictEqual({
      a: { $ne: null },
    });
  });

  it("should handle array length checking", () => {
    expect(buildFilter({ a: { length: { gt: 2 } } })).toStrictEqual({
      a: { $size: { $gt: 2 } },
    });
  });

  it("should handle array contains checking", () => {
    expect(buildFilter({ a: { contains: "something" } })).toStrictEqual({
      a: { $in: "something" },
    });
    expect(buildFilter({ a: { notContains: "something" } })).toStrictEqual({
      a: { $nin: "something" },
    });
  });

  it("should handle no filter", () => {
    expect(buildFilter(undefined)).toStrictEqual({});
  });
});
