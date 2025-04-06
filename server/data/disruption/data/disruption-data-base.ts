import { App } from "@/server/app";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";

/** Stores the data inherent to this particular type of disruption. */
export abstract class DisruptionDataBase {
  abstract getImpactedLines(app: App): readonly number[];
  abstract getWriteupAuthor(): DisruptionWriteupAuthor;
  abstract getRouteGraphModifier(): RouteGraphModifier;
  abstract getMapHighlighter(): MapHighlighter;
}
