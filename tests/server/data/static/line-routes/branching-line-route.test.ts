import { describe, expect, it } from "vitest";
import { BranchingLineRoute } from "../../../../../server/data/static/line-routes/branching-line-route";
import { expectPair } from "./utils";

describe("BranchingLineRoute", () => {
  describe("#edges", () => {
    it("should return correct edges", () => {
      const route = new BranchingLineRoute([1, 2], [3, 4], [5, 6]);
      expect(route.edges).toHaveLength(5);
      expectPair(route.edges, 1, 2);
      expectPair(route.edges, 2, 3);
      expectPair(route.edges, 3, 4);
      expectPair(route.edges, 2, 5);
      expectPair(route.edges, 5, 6);
    });
  });
});
