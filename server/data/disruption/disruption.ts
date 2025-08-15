import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { DisruptionData } from "@/server/data/disruption/data/disruption-data";

type Curation = "automatic" | "manual";

/**
 * Represents a curated disruption, ready for display on the site. Not to be
 * confused with an Alert, which is the raw data from the PTV API, which may or
 * may not be useful to us. ("Curated" here doesn't assume manual curation, it
 * could be automated in some cases.)
 */
export class Disruption {
  constructor(
    readonly id: string,
    readonly data: DisruptionData,
    readonly period: DisruptionPeriod,
    readonly curation: Curation,
    readonly alertId: string | null,
  ) {
    if (curation === "automatic" && alertId == null) {
      throw new Error(
        "Automatically curated disruptions must specify an alertId.",
      );
    }
  }

  with({
    id = this.id,
    data = this.data,
    period = this.period,
    curation = this.curation,
    alertId = this.alertId,
  }: {
    id?: string;
    data?: DisruptionData;
    period?: DisruptionPeriod;
    curation?: Curation;
    alertId?: string | null;
  }): Disruption {
    return new Disruption(id, data, period, curation, alertId);
  }
}
