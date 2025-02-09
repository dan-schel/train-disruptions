import { describe, expect, it } from "vitest";
import { LineSection } from "../../../../../server/data/line-section";
import { LoopLineRoute } from "../../../../../server/data/static/line-routes/loop-line-route";
import * as station from "../../../../../shared/station-ids";

const route = new LoopLineRoute([station.RICHMOND, 1, 2, 3, 4]);

describe("LoopLineRoute", () => {
  describe("#validateLineSection", () => {
    it("accepts a valid section", () => {
      const section1 = new LineSection("the-city", 3);
      const section2 = new LineSection(4, "the-city");
      const section3 = new LineSection(4, 2);
      expect(route.validateLineSection(section1).valid).toBe(true);
      expect(route.validateLineSection(section2).valid).toBe(true);
      expect(route.validateLineSection(section3).valid).toBe(true);
    });

    it("rejects a section with a station not in the line", () => {
      const section = new LineSection(1, 6);
      expect(route.validateLineSection(section).valid).toBe(false);
    });

    it("rejects direct mentions of city loop stations", () => {
      const section = new LineSection(station.FLINDERS_STREET, 4);
      expect(route.validateLineSection(section).valid).toBe(false);
    });
  });
});
