import { stations } from "../../static/stations";
import { StationClosureDisruptionData } from "../data/station-closure-disruption-data";
import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";
import { DisruptionWriteupAuthor } from "./disruption-writeup-author";

/** DisruptionWriteupAuther for StationClosureDisruptionData. */
export class StationClosureDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: StationClosureDisruptionData) {
    super();
  }

  write(disruption: Disruption): DisruptionWriteup {
    const stationName = stations.require(this._data.stationId).name;
    const periodString = disruption.period.toDisplayString();

    return new DisruptionWriteup(
      `${stationName} Station is closed`,

      // TODO: Mostly just an example. Further info to be added, no doubt.
      `${periodString}\n\nAll trains will run express through ${stationName} Station.`,

      `${stationName} closed`,
      "very-low",
    );
  }
}
