import { BusReplacementsDisruptionData } from "../data/bus-replacements-disruption-data";
import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";
import { DisruptionWriteupAuthor } from "./disruption-writeup-author";

/** DisruptionWriteupAuthor for BusReplacementsDisruptionData. */
export class BusReplacementsDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: BusReplacementsDisruptionData) {
    super();
  }

  write(disruption: Disruption, now: Date): DisruptionWriteup {
    const periodString = disruption.period.getDisplayString({ now });

    return new DisruptionWriteup(
      `${stationName} Station is closed`,

      // TODO: Mostly just an example. Further info to be added, no doubt.
      `${periodString}\n\nAll trains will run express through ${stationName} Station.`,

      `${stationName} closed`,
      "very-low",
    );
  }
}
