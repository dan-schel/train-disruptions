import { DelaysParser } from "@/server/auto-parser/delays-parser";
import { DelaysDisruptionData } from "@/server/data/disruption/data/delays-disruption-data";
import { EndsNever } from "@/server/data/disruption/period/ends/ends-never";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { LineSection } from "@/server/data/line-section";
import { FRANKSTON, SUNBURY } from "@/shared/line-ids";
import {
  ARMADALE,
  CAULFIELD,
  FOOTSCRAY,
  MALVERN,
  MIDDLE_FOOTSCRAY,
  WEST_FOOTSCRAY,
} from "@/shared/station-ids";
import { SampleAlerts } from "@/tests/server/parser/sample-alerts";
import { createTestApp } from "@/tests/server/utils";
import { describe, expect, it } from "vitest";

describe("Delays Auto Parser", () => {
  const { AlertStandardToNeverEnds, AlertNameCollision } = SampleAlerts.Delays;

  it("parses alert to a disruption with a standard period that never ends", () => {
    const { app } = createTestApp();
    const parser = new DelaysParser();

    const disruptions = parser.parseAlerts([AlertStandardToNeverEnds], app);

    expect(disruptions).toHaveLength(1);
    expect(disruptions.at(0)).toHaveProperty(
      "data",
      new DelaysDisruptionData(MALVERN, 10, [
        new LineSection(FRANKSTON, ARMADALE, CAULFIELD),
      ]),
    );
    expect(disruptions.at(0)).toHaveProperty("sourceAlertIds", [
      AlertStandardToNeverEnds.id,
    ]);
    expect(disruptions.at(0)).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(null, new EndsNever()),
    );
    expect(disruptions.at(0)).toHaveProperty("curation", "automatic");
  });

  it("ignores alerts that don't qualify as delays", () => {
    const { app } = createTestApp();
    const parser = new DelaysParser();

    const disruptions = parser.parseAlerts(
      Object.values(SampleAlerts.BusReplacements),
      app,
    );

    expect(disruptions).toHaveLength(0);
  });

  it("selects the correct station", () => {
    const { app } = createTestApp();
    const parser = new DelaysParser();

    const disruptions = parser.parseAlerts([AlertNameCollision], app);

    expect(disruptions).toHaveLength(1);
    expect(disruptions.at(0)).toHaveProperty(
      "data",
      new DelaysDisruptionData(MIDDLE_FOOTSCRAY, 50, [
        new LineSection(SUNBURY, FOOTSCRAY, WEST_FOOTSCRAY),
      ]),
    );
    expect(disruptions.at(0)).toHaveProperty("sourceAlertIds", [
      AlertNameCollision.id,
    ]);
    expect(disruptions.at(0)).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(null, new EndsNever()),
    );
    expect(disruptions.at(0)).toHaveProperty("curation", "automatic");
  });
});
