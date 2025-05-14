import { DelaysParserRule } from "@/server/auto-parser/rules/delays-parser-rule";
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
    const parser = new DelaysParserRule();

    const disruption = parser.parseAlert(AlertStandardToNeverEnds, app);

    expect(disruption).not.toBeNull();
    expect(disruption).toHaveProperty(
      "data",
      new DelaysDisruptionData(MALVERN, 10, [
        new LineSection(FRANKSTON, ARMADALE, CAULFIELD),
      ]),
    );
    expect(disruption).toHaveProperty("sourceAlertIds", [
      AlertStandardToNeverEnds.id,
    ]);
    expect(disruption).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(null, new EndsNever()),
    );
    expect(disruption).toHaveProperty("curation", "automatic");
  });

  it("ignores alerts that don't qualify as delays", () => {
    const { app } = createTestApp();
    const parser = new DelaysParserRule();

    const alerts = Object.values(SampleAlerts.BusReplacements);
    const disruptions = alerts.map((x) => parser.parseAlert(x, app));

    expect(disruptions).toHaveLength(alerts.length);
    expect(disruptions).toStrictEqual(
      Array.from({ length: alerts.length }, () => null),
    );
  });

  it("selects the correct station", () => {
    const { app } = createTestApp();
    const parser = new DelaysParserRule();

    const disruption = parser.parseAlert(AlertNameCollision, app);

    expect(disruption).not.toBeNull();
    expect(disruption).toHaveProperty(
      "data",
      new DelaysDisruptionData(MIDDLE_FOOTSCRAY, 50, [
        new LineSection(SUNBURY, FOOTSCRAY, WEST_FOOTSCRAY),
      ]),
    );
    expect(disruption).toHaveProperty("sourceAlertIds", [
      AlertNameCollision.id,
    ]);
    expect(disruption).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(null, new EndsNever()),
    );
    expect(disruption).toHaveProperty("curation", "automatic");
  });
});
