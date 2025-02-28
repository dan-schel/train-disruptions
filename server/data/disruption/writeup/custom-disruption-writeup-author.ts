import { CustomDisruptionData } from "../data/custom-disruption-data";
import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";
import { DisruptionWriteupAuthor } from "./disruption-writeup-author";

/** DisruptionWriteupAuther for CustomDisruptionData. */
export class CustomDisruptionWriteupAuthor extends DisruptionWriteupAuthor {
  constructor(private readonly _data: CustomDisruptionData) {
    super();
  }

  write(_disruption: Disruption): DisruptionWriteup {
    return this._data.writeup;
  }
}
