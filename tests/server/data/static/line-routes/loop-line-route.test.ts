import { describe, expect, it } from "vitest";
import { LoopLineRoute } from "../../../../../server/data/static/line-routes/loop-line-route";
import * as station from "../../../../../shared/station-ids";
import { expectPair } from "./utils";

describe("LoopLineRoute", () => {
  describe("#edges", () => {
    it("should return correct edges", () => {
      const route = new LoopLineRoute([station.RICHMOND, 1, 2]);
      expect(route.edges).toHaveLength(8);
      expectPair(route.edges, station.FLINDERS_STREET, station.SOUTHERN_CROSS);
      expectPair(route.edges, station.SOUTHERN_CROSS, station.FLAGSTAFF);
      expectPair(route.edges, station.FLAGSTAFF, station.MELBOURNE_CENTRAL);
      expectPair(route.edges, station.MELBOURNE_CENTRAL, station.PARLIAMENT);
      expectPair(route.edges, station.PARLIAMENT, station.RICHMOND);
      expectPair(route.edges, station.FLINDERS_STREET, station.RICHMOND);
      expectPair(route.edges, station.RICHMOND, 1);
      expectPair(route.edges, 1, 2);
    });
  });
});
