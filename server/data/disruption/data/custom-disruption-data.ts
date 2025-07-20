import { z } from "zod";
import { DisruptionDataBase } from "@/server/data/disruption/data/disruption-data-base";
import { DisruptionWriteup } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "@/server/data/disruption/writeup/disruption-writeup-author";
import { CustomDisruptionWriteupAuthor } from "@/server/data/disruption/writeup/custom-disruption-writeup-author";
import { RouteGraphTrainEdge } from "@/server/data/route-graph/edge/route-graph-train-edge";
import {
  RouteGraphEdge,
  routeGraphEdgeBson,
} from "@/server/data/route-graph/edge/route-graph-edge";
import { RouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/route-graph-modifier";
import { SimpleRouteGraphModifier } from "@/server/data/disruption/route-graph-modifier/simple-route-graph-modifier";
import { CustomMapHighlighter } from "@/server/data/disruption/map-highlighting/custom-map-highlighter";
import { MapHighlighting } from "@/server/data/disruption/map-highlighting/map-highlighting";
import { MapHighlighter } from "@/server/data/disruption/map-highlighting/map-highlighter";
import { App } from "@/server/app";

/**
 * Used in edge cases where the normal disruption types we have don't cut it.
 * Allows each use case of the disruption data (e.g. the display string, routing
 * graph modifications, etc.) to be provided manually.
 */
export class CustomDisruptionData extends DisruptionDataBase {
  constructor(
    readonly impactedLines: readonly number[],
    readonly writeup: DisruptionWriteup,
    readonly edgesToRemove: readonly RouteGraphTrainEdge[],
    readonly edgesToAdd: readonly RouteGraphEdge[],
    readonly highlighting: MapHighlighting,
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("custom"),
      impactedLines: z.number().array().readonly(),
      writeup: DisruptionWriteup.bson,
      edgesToRemove: RouteGraphTrainEdge.bson.array(),
      edgesToAdd: routeGraphEdgeBson.array(),
      highlighting: MapHighlighting.bson,
    })
    .transform(
      (x) =>
        new CustomDisruptionData(
          x.impactedLines,
          x.writeup,
          x.edgesToRemove,
          x.edgesToAdd,
          x.highlighting,
        ),
    );

  toBson(): z.input<typeof CustomDisruptionData.bson> {
    return {
      type: "custom",
      impactedLines: this.impactedLines,
      writeup: this.writeup.toBson(),
      edgesToRemove: this.edgesToRemove.map((x) => x.toBson()),
      edgesToAdd: this.edgesToAdd.map((x) => x.toBson()),
      highlighting: this.highlighting.toBson(),
    };
  }

  inspect(): string {
    return JSON.stringify(this.toBson(), undefined, 2);
  }

  getImpactedLines(): readonly number[] {
    return this.impactedLines;
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new CustomDisruptionWriteupAuthor(this);
  }

  getRouteGraphModifier(): RouteGraphModifier {
    return new SimpleRouteGraphModifier(this.edgesToRemove, this.edgesToAdd);
  }

  getMapHighlighter(): MapHighlighter {
    return new CustomMapHighlighter(this.highlighting);
  }

  validate(app: App): boolean {
    return this.impactedLines.every((line) => app.lines.has(line));
  }
}
