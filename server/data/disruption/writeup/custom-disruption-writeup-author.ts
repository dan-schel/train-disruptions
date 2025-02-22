import { CustomDisruptionData } from "../data/custom-disruption-data";
import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";

export class CustomDisruptionWriteupAuthor {
  constructor(private readonly _data: CustomDisruptionData) {}

  write(_disruption: Disruption): DisruptionWriteup {
    return this._data.writeup;
  }
}
