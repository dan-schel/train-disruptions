import { describe, expect, it } from "vitest";
import { LineSection } from "../../../../../server/data/line-section";
import { DualPathLineRoute } from "../../../../../server/data/static/line-routes/dual-path-line-route";

const route = new DualPathLineRoute([1, 2, 3], [4, 5, 6], [7, 8], [9]);

describe("DualPathLineRoute", () => {
  describe("#validateLineSection", () => {
    it("accepts a valid section", () => {
      const section1 = new LineSection(1, 9);
      const section2 = new LineSection(2, 5);
      const section3 = new LineSection(7, 9);
      const section4 = new LineSection(4, 6);
      expect(route.validateLineSection(section1).valid).toBe(true);
      expect(route.validateLineSection(section2).valid).toBe(true);
      expect(route.validateLineSection(section3).valid).toBe(true);
      expect(route.validateLineSection(section4).valid).toBe(true);
    });

    it("rejects 'the-city' as a station", () => {
      const section = new LineSection("the-city", 3);
      expect(route.validateLineSection(section).valid).toBe(false);
    });

    it("rejects sections that cross paths", () => {
      const section = new LineSection(5, 7);
      expect(route.validateLineSection(section).valid).toBe(false);
    });
  });
});
