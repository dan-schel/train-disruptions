import { formatSections } from "@/server/data/disruption/writeup/utils";
import { LineSection } from "@/server/data/line-section";
import {
  CRANBOURNE as CRANBOURNE_LINE,
  PAKENHAM as PAKENHAM_LINE,
  FRANKSTON as FRANKSTON_LINE,
} from "@/shared/line-ids";
import {
  CAULFIELD,
  CRANBOURNE,
  DANDENONG,
  EAST_PAKENHAM,
  SOUTH_YARRA,
  WESTALL,
} from "@/shared/station-ids";
import { createTestApp } from "@/tests/server/utils";
import { describe, expect, it } from "vitest";

describe("#formatSections", () => {
  it("handles cases with one section", () => {
    const { app } = createTestApp();
    const sections = [new LineSection(PAKENHAM_LINE, "the-city", CAULFIELD)];
    const output = formatSections(app, sections);
    expect(output).toBe("from the city to Caulfield");
  });

  it("handles cases with identical sections", () => {
    const { app } = createTestApp();
    const sections = [
      new LineSection(PAKENHAM_LINE, SOUTH_YARRA, CAULFIELD),
      new LineSection(CRANBOURNE_LINE, CAULFIELD, SOUTH_YARRA),
      new LineSection(FRANKSTON_LINE, SOUTH_YARRA, CAULFIELD),
    ];
    const output = formatSections(app, sections);
    expect(output).toBe("from South Yarra to Caulfield");
  });

  it("handles cases with a common node", () => {
    const { app } = createTestApp();

    const sections1 = [
      new LineSection(PAKENHAM_LINE, WESTALL, EAST_PAKENHAM),
      new LineSection(CRANBOURNE_LINE, WESTALL, CRANBOURNE),
    ];
    const output1 = formatSections(app, sections1);
    expect(output1).toBe("from Westall to East Pakenham and Cranbourne");

    const sections2 = [
      new LineSection(PAKENHAM_LINE, EAST_PAKENHAM, WESTALL),
      new LineSection(CRANBOURNE_LINE, WESTALL, CRANBOURNE),
    ];
    const output2 = formatSections(app, sections2);
    expect(output2).toBe("from Westall to East Pakenham and Cranbourne");
  });

  it("handles complex cases", () => {
    const { app } = createTestApp();

    const sections1 = [
      new LineSection(PAKENHAM_LINE, WESTALL, EAST_PAKENHAM),
      new LineSection(FRANKSTON_LINE, CAULFIELD, SOUTH_YARRA),
    ];
    const output1 = formatSections(app, sections1);
    expect(output1).toBe(
      "from Westall to East Pakenham and from Caulfield to South Yarra",
    );

    const sections2 = [
      new LineSection(PAKENHAM_LINE, WESTALL, EAST_PAKENHAM),
      new LineSection(FRANKSTON_LINE, CAULFIELD, SOUTH_YARRA),
      new LineSection(CRANBOURNE_LINE, DANDENONG, CRANBOURNE),
    ];
    const output2 = formatSections(app, sections2);
    expect(output2).toBe(
      "from Westall to East Pakenham, from Caulfield to South Yarra, and from Dandenong to Cranbourne",
    );
  });
});
