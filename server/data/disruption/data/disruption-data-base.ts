import { RouteGraphModifier } from "../route-graph-modifier/route-graph-modifier";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";

/** Stores the data inherent to this particular type of disruption. */
export abstract class DisruptionDataBase {
  abstract getImpactedLines(): readonly number[];
  abstract getWriteupAuthor(): DisruptionWriteupAuthor;
  abstract getRouteGraphModifier(): RouteGraphModifier;
}
