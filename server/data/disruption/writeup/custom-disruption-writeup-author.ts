import { CustomDisruptionData } from "@/server/data/disruption/data/custom-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";

/** DisruptionWriteupAuther for CustomDisruptionData. */
export class CustomDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: CustomDisruptionData) {
    super();
  }

  write(_disruption: Disruption, _now: Date): DisruptionWriteup {
    return this._data.writeup;
  }
}
