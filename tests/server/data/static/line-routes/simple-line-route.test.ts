import { describe, it } from "vitest";
import { SimpleLineRoute } from "../../../../../server/data/static/line-routes/simple-line-route";
import { expectPair } from "./utils";

describe("SimpleLineRoute", () => {
  describe("#edges", () => {
    it("should return correct edges", () => {
      const route = new SimpleLineRoute([1, 2, 3, 4]);
      expectPair(route.edges, 1, 2);
      expectPair(route.edges, 2, 3);
      expectPair(route.edges, 3, 4);
    });
  });
});
