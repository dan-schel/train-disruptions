import { App } from "@/server/app";
import { NoTrainsRunningDisruptionData } from "@/server/data/disruption/data/no-trains-running-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { formatSections } from "@/server/data/disruption/writeup/utils";

/** DisruptionWriteupAuthor for NoTrainsRunningDisruptionData. */
export class NoTrainsRunningDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: NoTrainsRunningDisruptionData) {
    super();
  }

  write(app: App, disruption: Disruption): DisruptionWriteup {
    const sections = formatSections(app, this._data.sections);
    const periodString = disruption.period.getDisplayString({
      now: app.time.now(),
    });

    return new DisruptionWriteup(
      `Trains not running ${sections}`,

      // TODO: Mostly just an example. Improvements to be made here, no doubt.
      `Occurs ${periodString}.\nTrains not running ${sections}.`,

      {
        // TODO: Far from perfect yet. Period string too long and subject
        // contains "from".
        headline: "Trains not running",
        subject: sections,
        period: periodString,
        iconType: "line",
      },

      // TODO: Should be customisable per line, so we can display the relevant
      // section without listing them all.
      {
        summary: `Trains not running`,
        priority: "medium",
      },
    );
  }
}
