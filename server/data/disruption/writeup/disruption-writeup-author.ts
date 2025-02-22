import { Disruption } from "../disruption";
import { DisruptionWriteup } from "./disruption-writeup";

/**
 * Knows how to create a writeup for a particular disruption data type, despite
 * the fact the disruption data type doesn't know everything, e.g. the
 * disruption period.
 */
export abstract class DisruptionWriteupAuthor {
  abstract write(disruption: Disruption): DisruptionWriteup;
}
