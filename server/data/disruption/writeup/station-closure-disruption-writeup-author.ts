import { App } from "@/server/app";
import { StationClosureDisruptionData } from "@/server/data/disruption/data/station-closure-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";

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
      `Occurs ${periodString}.\nAll trains will run express through ${stationName} Station.`,

      `${stationName} closed`,
      "very-low",
    );
  }
}
