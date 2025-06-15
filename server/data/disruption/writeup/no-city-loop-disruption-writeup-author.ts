import { App } from "@/server/app";
import { NoCityLoopDisruptionData } from "@/server/data/disruption/data/no-city-loop-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { listifyAnd } from "@dan-schel/js-utils";

/** DisruptionWriteupAuthor for NoCityLoopDisruptionData. */
export class NoCityLoopDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: NoCityLoopDisruptionData) {
    super();
  }

  write(app: App, disruption: Disruption): DisruptionWriteup {
    const periodString = disruption.period.getDisplayString({
      now: app.time.now(),
    });
    const lines = this._data
      .getImpactedLines(app)
      .map((x) => app.lines.require(x));

    const subjectString = `on the ${listifyAnd(lines.map((x) => x.name))} line${lines.length > 1 ? "s" : ""}`;

    return new DisruptionWriteup(
      `No city loop services ${subjectString}`,
      `Occurs ${periodString}.\nTrains ${subjectString} will run direct to and from Flinders Street, not via the City Loop.`,
      {
        headline: "No city loop services",
        subject: subjectString,
        period: periodString,
        iconType: "altered-route",
      },
      {
        summary: `No city loop services`,
        priority: "low",
      },
    );
  }
}
