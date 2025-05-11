import { App } from "@/server/app";
import { DelaysDisruptionData } from "@/server/data/disruption/data/delays-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { listifyAnd } from "@dan-schel/js-utils";

/** DisruptionWriteupAuthor for DelaysDisruptionData. */
export class DelaysDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: DelaysDisruptionData) {
    super();
  }

  write(app: App, disruption: Disruption): DisruptionWriteup {
    const stationName = app.stations.require(this._data.stationId).name;
    const delayStatus = this._data.delayInMinutes >= 30 ? "Major" : "Minor";
    const lines = listifyAnd(
      disruption.data
        .getImpactedLines(app)
        .map((x) => app.lines.require(x).name),
    );

    return new DisruptionWriteup(
      `${delayStatus} delays near ${stationName} station`,
      `Delays of up to ${this._data.delayInMinutes} minute${this._data.delayInMinutes > 1 ? "s" : ""} are expected from ${disruption.period.getDisplayString({ now: app.time.now() })}.\n` +
        `${delayStatus} delays are currently affecting train services near ${stationName} station along the ${lines} line.`,
      {
        headline: null,
        subject: `${delayStatus} delays near ${stationName} station`,
        period: `Expect delays of up to ${this._data.delayInMinutes} minute${this._data.delayInMinutes > 1 ? "s" : ""}`,
        iconType: "traffic",
      },
      {
        summary: `${delayStatus} delays near ${stationName} station`,
        priority: "low",
      },
    );
  }
}
