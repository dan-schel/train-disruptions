import { describe, expect, it } from "vitest";
import { LineSection } from "../../../../../server/data/line-section";
import { SimpleLineRoute } from "../../../../../server/data/static/line-routes/simple-line-route";

const route = new SimpleLineRoute([
  1,
  2,
  3,
  { id: 4, type: "always-express" },
  5,
]);

describe("SimpleLineRoute", () => {
  describe("#validateLineSection", () => {
    it("accepts a valid section", () => {
      const section = new LineSection(1, 2);
      expect(route.validateLineSection(section).valid).toBe(true);
    });

    it("rejects 'the-city' as a station", () => {
      const section = new LineSection("the-city", 3);
      expect(route.validateLineSection(section).valid).toBe(false);
    });

    it("rejects a section with a station not in the line", () => {
      const section = new LineSection(1, 6);
      expect(route.validateLineSection(section).valid).toBe(false);
    });

    it("rejects express stations if asked", () => {
      const section = new LineSection(1, 4);
      const result1 = route.validateLineSection(section);
      const result2 = route.validateLineSection(section, {
        ignoreExpressStops: true,
      });
      expect(result1.valid).toBe(true);
      expect(result2.valid).toBe(false);
    });
  });
});
