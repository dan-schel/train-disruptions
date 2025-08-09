import { DisruptionData } from "@/server/data/disruption/data/disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { uuid } from "@dan-schel/js-utils";

export class AutoParsingOutput {
  constructor(
    readonly data: DisruptionData,
    readonly period: DisruptionPeriod,
  ) {}

  toNewDisruption(sourceAlertIds: string[]): Disruption {
    return new Disruption(
      uuid(),
      this.data,
      sourceAlertIds,
      this.period,
      "automatic",
    );
  }

  updateExistingDisruption(existing: Disruption): Disruption {
    return new Disruption(
      existing.id,
      this.data,
      existing.sourceAlertIds,
      this.period,
      "automatic",
    );
  }
}
