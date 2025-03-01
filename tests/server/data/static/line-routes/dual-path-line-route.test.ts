import { describe, expect, it } from "vitest";
import { DualPathLineRoute } from "../../../../../server/data/static/line-routes/dual-path-line-route";
import { expectPair } from "./utils";

describe("DualPathLineRoute", () => {
  describe("#edges", () => {
    it("should return correct edges", () => {
      const route1 = new DualPathLineRoute([1, 2], [3, 4], [5, 6], [7, 8]);
      expect(route1.edges).toHaveLength(8);
      expectPair(route1.edges, 1, 2);
      expectPair(route1.edges, 2, 3);
      expectPair(route1.edges, 3, 4);
      expectPair(route1.edges, 4, 7);
      expectPair(route1.edges, 7, 8);
      expectPair(route1.edges, 2, 5);
      expectPair(route1.edges, 5, 6);
      expectPair(route1.edges, 6, 7);

      const route2 = new DualPathLineRoute([1, 2], [], [3, 4], [5, 6]);
      expect(route2.edges).toHaveLength(6);
      expectPair(route2.edges, 1, 2);
      expectPair(route2.edges, 2, 3);
      expectPair(route2.edges, 3, 4);
      expectPair(route2.edges, 4, 5);
      expectPair(route2.edges, 5, 6);
      expectPair(route2.edges, 2, 5);
    });
  });
});
