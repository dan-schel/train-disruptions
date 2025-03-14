import { App } from "@/server/app";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { formatSections } from "@/server/data/disruption/writeup/utils";

/** DisruptionWriteupAuthor for BusReplacementsDisruptionData. */
export class BusReplacementsDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: BusReplacementsDisruptionData) {
    super();
  }

  write(app: App, disruption: Disruption): DisruptionWriteup {
    const sections = formatSections(app, this._data.sections);
    const periodString = disruption.period.getDisplayString({
      now: app.time.now(),
    });

    return new DisruptionWriteup(
      `Buses replace trains ${sections}`,
      `${periodString}\n\nBuses replace trains ${sections}.`,

      // TODO: Should be customisable per line, so we can display the relevant
      // section without listing them all.
      `Buses replace trains`,

      "medium",
    );
  }
}
