import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { BusReplacementsDisruptionWriteupAuthor } from "@/server/data/disruption/writeup/bus-replacements-disruption-writeup-author";
import { LineSection } from "@/server/data/line-section";
import {
  CRANBOURNE as CRANBOURNE_LINE,
  PAKENHAM as PAKENHAM_LINE,
  FRANKSTON as FRANKSTON_LINE,
} from "@/shared/line-ids";
import {
  CAULFIELD,
  CRANBOURNE,
  EAST_PAKENHAM,
  SOUTH_YARRA,
  WESTALL,
} from "@/shared/station-ids";
import { createTestApp } from "@/tests/server/utils";
import { describe, expect, it } from "vitest";

describe("BusReplacementsDisruptionWriteupAuthor", () => {
  describe("#write", () => {
    it("handles cases with one section", () => {
      const sections = [new LineSection(PAKENHAM_LINE, "the-city", CAULFIELD)];
      const writeup = writeupFromSections(sections);
      expect(writeup.title).toBe(
        "Buses replace trains from the city to Caulfield",
      );
    });

    it("handles cases with identical sections", () => {
      const sections = [
        new LineSection(PAKENHAM_LINE, SOUTH_YARRA, CAULFIELD),
        new LineSection(CRANBOURNE_LINE, CAULFIELD, SOUTH_YARRA),
        new LineSection(FRANKSTON_LINE, SOUTH_YARRA, CAULFIELD),
      ];
      const writeup = writeupFromSections(sections);
      expect(writeup.title).toBe(
        "Buses replace trains from South Yarra to Caulfield",
      );
    });

    it("handles cases with a common node", () => {
      const sections1 = [
        new LineSection(PAKENHAM_LINE, WESTALL, EAST_PAKENHAM),
        new LineSection(CRANBOURNE_LINE, WESTALL, CRANBOURNE),
      ];
      const writeup1 = writeupFromSections(sections1);
      expect(writeup1.title).toBe(
        "Buses replace trains from Westall to East Pakenham and Cranbourne",
      );

      const sections2 = [
        new LineSection(PAKENHAM_LINE, EAST_PAKENHAM, WESTALL),
        new LineSection(CRANBOURNE_LINE, WESTALL, CRANBOURNE),
      ];
      const writeup2 = writeupFromSections(sections2);
      expect(writeup2.title).toBe(
        "Buses replace trains from Westall to East Pakenham and Cranbourne",
      );
    });

    it("handles complex cases", () => {
      const sections = [
        new LineSection(PAKENHAM_LINE, WESTALL, EAST_PAKENHAM),
        new LineSection(FRANKSTON_LINE, CAULFIELD, SOUTH_YARRA),
      ];
      const writeup = writeupFromSections(sections);
      expect(writeup.title).toBe(
        "Buses replace trains from Westall to East Pakenham and Caulfield to South Yarra",
      );
    });

    function writeupFromSections(sections: LineSection[]) {
      const { app } = createTestApp();
      const data = new BusReplacementsDisruptionData(sections);
      const author = new BusReplacementsDisruptionWriteupAuthor(data);
      const period = new StandardDisruptionPeriod(
        new Date("2025-03-13T21:00:00+11:00"),
        new EndsExactly(new Date("2025-03-15T00:00:00+11:00")),
      );
      const disruption = new Disruption("1", data, [], period);
      return author.write(app, disruption);
    }
  });
});
