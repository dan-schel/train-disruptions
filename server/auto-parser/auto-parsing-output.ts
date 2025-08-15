import { DisruptionData } from "@/server/data/disruption/data/disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionPeriod } from "@/server/data/disruption/period/disruption-period";
import { uuid } from "@dan-schel/js-utils";

export class AutoParsingOutput {
  constructor(
    readonly data: DisruptionData,
    readonly period: DisruptionPeriod,
  ) {}

  toNewDisruption(alertId: string): Disruption {
    return new Disruption(uuid(), this.data, this.period, "automatic", alertId);
  }

  updateExistingDisruption(disruptionId: string, alertId: string): Disruption {
    return new Disruption(
      disruptionId,
      this.data,
      this.period,
      "automatic",
      alertId,
    );
  }
}
