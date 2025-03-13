import { App } from "../../../app";
import { BusReplacementsDisruptionData } from "../data/bus-replacements-disruption-data";
import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";
import { DisruptionWriteupAuthor } from "./disruption-writeup-author";

/** DisruptionWriteupAuthor for BusReplacementsDisruptionData. */
export class BusReplacementsDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: BusReplacementsDisruptionData) {
    super();
  }

  write(_app: App, _disruption: Disruption): DisruptionWriteup {
    // const periodString = disruption.period.getDisplayString({
    //   now: app.time.now(),
    // });

    return new DisruptionWriteup();
  }

  private _formatLineSections(): string {}
}
