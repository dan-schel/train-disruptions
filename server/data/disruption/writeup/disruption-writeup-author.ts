import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";

export abstract class DisruptionWriteupAuthor {
  abstract write(disruption: Disruption): DisruptionWriteup;
}
