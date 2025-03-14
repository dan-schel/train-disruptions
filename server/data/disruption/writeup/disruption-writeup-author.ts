import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";

/**
 * Knows how to create a writeup for a particular disruption data type, despite
 * the fact the disruption data type doesn't know everything, e.g. the
 * disruption period.
 */
export abstract class DisruptionWriteupAuthor {
  abstract write(app: App, disruption: Disruption): DisruptionWriteup;
}
