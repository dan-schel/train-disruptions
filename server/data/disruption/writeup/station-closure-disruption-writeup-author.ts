import { App } from "../../../app";
import { StationClosureDisruptionData } from "../data/station-closure-disruption-data";
import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";
import { DisruptionWriteupAuthor } from "./disruption-writeup-author";

/** DisruptionWriteupAuthor for StationClosureDisruptionData. */
export class StationClosureDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: StationClosureDisruptionData) {
    super();
  }

  write(app: App, disruption: Disruption): DisruptionWriteup {
    const stationName = app.stations.require(this._data.stationId).name;
    const periodString = disruption.period.getDisplayString({
      now: app.time.now(),
    });

    return new DisruptionWriteup(
      `${stationName} Station is closed`,

      // TODO: Mostly just an example. Further info to be added, no doubt.
      `${periodString}\n\nAll trains will run express through ${stationName} Station.`,

      `${stationName} closed`,
      "very-low",
    );
  }
}
