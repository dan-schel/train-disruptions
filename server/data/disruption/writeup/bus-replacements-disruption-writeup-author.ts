import { App } from "@/server/app";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";

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
