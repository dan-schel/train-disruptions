import { EveningsOnlyDisruptionPeriod } from "./disruptions/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "./disruptions/period/standard-disruption-period";
import { StationClosureDisruptionData } from "./disruptions/station-closure";

/**
 * Represents a curated disruption, ready for display on the site. Not to be
 * confused with an Alert, which is the raw data from the PTV API, which may or
 * may not be useful to us. ("Curated" here doesn't assume manual curation, it
 * could be automated in some cases.)
 */
export class Disruption {
  constructor(
    readonly id: string,
    // TODO: Becomes:
    // ```
    // readonly data:
    //   | StationClosureDisruptionData
    //   | NoCityLoopDisruptionData
    //   | BusReplacementsDisruptionData
    //   | etc.
    // ```
    // as more types are added.
    readonly data: StationClosureDisruptionData,
    readonly sourceAlertIds: string[],
    readonly period: StandardDisruptionPeriod | EveningsOnlyDisruptionPeriod,
  ) {}
}

/**
 * The base class for disruption data, which will change depending on the type
 * of disruption occurring.
 */
export abstract class DisruptionData<T extends string> {
  constructor(readonly type: T) {}
}
