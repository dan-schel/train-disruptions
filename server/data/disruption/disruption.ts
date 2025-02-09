import { DisruptionPeriod } from "./period/disruption-period";
import { DisruptionData } from "./data/disruption-data";

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
    readonly sourceAlertIds: string[],
    readonly period: DisruptionPeriod,
  ) {}
}
