import { describe, expect, it } from "vitest";
import { LineSection } from "../../../server/data/line-section";
import { SimpleLineRoute } from "../../../server/data/static/line-routes/simple-line-route";
import { LoopLineRoute } from "../../../server/data/static/line-routes/loop-line-route";
import * as station from "../../../shared/station-ids";
import { DualPathLineRoute } from "../../../server/data/static/line-routes/dual-path-line-route";
import { BranchingLineRoute } from "../../../server/data/static/line-routes/branching-line-route";
import { Line } from "../../../server/data/static/line";

describe("LineSection", () => {
  describe("#validate", () => {
    describe("using SimpleLineRoute", () => {
      const route = new SimpleLineRoute([
        1,
        2,
        3,
        { id: 4, type: "always-express" },
        5,
      ]);

      it("accepts a valid section", () => {
        const section = new LineSection(1, 2);
        expect(section.validate(route, true)).toBe(true);
      });

      it("rejects 'the-city' as a station", () => {
        const section = new LineSection("the-city", 3);
        expect(section.validate(route, true)).toBe(false);
      });

      it("rejects a section with a station not in the line", () => {
        const section = new LineSection(1, 6);
        expect(section.validate(route, true)).toBe(false);
      });

      it("rejects express stations if asked", () => {
        const section = new LineSection(1, 4);
        expect(section.validate(route, true)).toBe(true);
        expect(section.validate(route, false)).toBe(false);
      });
    });

    describe("using LoopLineRoute", () => {
      const route = new LoopLineRoute([station.RICHMOND, 1, 2, 3, 4]);

      it("accepts a valid section", () => {
        const section1 = new LineSection("the-city", 3);
        const section2 = new LineSection(4, "the-city");
        const section3 = new LineSection(4, 2);
        expect(section1.validate(route, true)).toBe(true);
        expect(section2.validate(route, true)).toBe(true);
        expect(section3.validate(route, true)).toBe(true);
      });

      it("rejects a section with a station not in the line", () => {
        const section = new LineSection(1, 6);
        expect(section.validate(route, true)).toBe(false);
      });

      it("rejects direct mentions of city loop stations", () => {
        const section = new LineSection(station.FLINDERS_STREET, 4);
        expect(section.validate(route, true)).toBe(false);
      });
    });

    describe("using BranchingLineRoute", () => {
      const route = new BranchingLineRoute([1, 2, 3, 4], [5, 6, 7], [8, 9]);

      it("accepts a valid section", () => {
        const section1 = new LineSection(1, 9);
        const section2 = new LineSection(5, 7);
        const section3 = new LineSection(1, 4);
        expect(section1.validate(route, true)).toBe(true);
        expect(section2.validate(route, true)).toBe(true);
        expect(section3.validate(route, true)).toBe(true);
      });

      it("rejects 'the-city' as a station", () => {
        const section = new LineSection("the-city", 4);
        expect(section.validate(route, true)).toBe(false);
      });

      it("rejects sections that cross branches", () => {
        const section = new LineSection(5, 9);
        expect(section.validate(route, true)).toBe(false);
      });
    });

    describe("using DualPathLineRoute", () => {
      const route = new DualPathLineRoute([1, 2, 3], [4, 5, 6], [7, 8], [9]);

      it("accepts a valid section", () => {
        const section1 = new LineSection(1, 9);
        const section2 = new LineSection(2, 5);
        const section3 = new LineSection(7, 9);
        const section4 = new LineSection(4, 6);
        expect(section1.validate(route, true)).toBe(true);
        expect(section2.validate(route, true)).toBe(true);
        expect(section3.validate(route, true)).toBe(true);
        expect(section4.validate(route, true)).toBe(true);
      });

      it("rejects 'the-city' as a station", () => {
        const section = new LineSection("the-city", 3);
        expect(section.validate(route, true)).toBe(false);
      });

      it("rejects sections that cross paths", () => {
        const section = new LineSection(5, 7);
        expect(section.validate(route, true)).toBe(false);
      });
    });
  });

  describe("#toMapSection", () => {
    it("outputs the correct map section", () => {
      const line = new Line({
        id: 1,
        name: "Test Line",
        ptvIds: [],
        route: new SimpleLineRoute([1, 2, 3, 4, 5]),
      });
      const section = new LineSection(1, 4);
      const result = section.toMapSections(line);

      expect(result.length).toEqual(1);
      expect(result[0].line).toEqual(1);
      expect(result[0].stationIds).toEqual([1, 2, 3, 4]);
    });

    it("outputs the correct map sections for the city loop", () => {
      const line = new Line({
        id: 1,
        name: "Test Line",
        ptvIds: [],
        route: new LoopLineRoute([station.RICHMOND, 1, 2, 3, 4]),
      });
      const section = new LineSection("the-city", 2);
      const result = section.toMapSections(line);

      expect(result.length).toEqual(2);
      expect(result[0].line).toEqual(1);
      expect(result[0].stationIds).toEqual([
        station.FLINDERS_STREET,
        station.RICHMOND,
        1,
        2,
      ]);
      expect(result[1].line).toEqual(1);
      expect(result[0].stationIds).toEqual([
        station.FLINDERS_STREET,
        station.SOUTHERN_CROSS,
        station.FLAGSTAFF,
        station.MELBOURNE_CENTRAL,
        station.PARLIAMENT,
        station.RICHMOND,
      ]);
    });
  });
});
