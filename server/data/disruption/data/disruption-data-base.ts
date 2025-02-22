import { RouteGraphImplications } from "../../route-graph/route-graph-implications";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";

export const LineStatusIndicatorPriorities = [
  // Never shown on the line status indicator.
  "hidden",

  // e.g. Station closure.
  "very-low",

  // e.g. Delays.
  "low",

  // e.g. Buses replace trains.
  "medium",

  // e.g. Line suspended.
  "high",
] as const;

export type LineStatusIndicatorPriority =
  (typeof LineStatusIndicatorPriorities)[number];

/** Stores the data inherent to this particular type of disruption. */
export abstract class DisruptionDataBase {
  abstract getWriteupAuthor(): DisruptionWriteupAuthor;
  abstract getRouteGraphImplications(): RouteGraphImplications;
  abstract getLineStatusIndicatorPriority(): LineStatusIndicatorPriority;
}
