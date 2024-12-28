import { describe, expect, it } from "vitest";
import { buildSort } from "../../../../server/database/mongo/build-sort";

describe("buildSort", () => {
  it("should handle array contains checking", () => {
    expect(buildSort({ by: "a", direction: "asc" })).toStrictEqual([
      "a",
      "asc",
    ]);
    expect(buildSort({ by: "a", direction: "desc" })).toStrictEqual([
      "a",
      "desc",
    ]);
  });

  it("should handle no sorting", () => {
    expect(buildSort(undefined)).toStrictEqual(undefined);
  });
});
