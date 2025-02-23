import { z } from "zod";
import { DisruptionDataBase } from "./disruption-data-base";
import { DisruptionWriteup } from "../writeup/disruption-writeup";
import { DisruptionWriteupAuthor } from "../writeup/disruption-writeup-author";
import { CustomDisruptionWriteupAuthor } from "../writeup/custom-disruption-writeup-author";
import { RouteGraphTrainEdge } from "../../route-graph/edge/route-graph-train-edge";
import {
  RouteGraphEdge,
  routeGraphEdgeBson,
} from "../../route-graph/edge/route-graph-edge";
import { RouteGraphModifier } from "../route-graph-modifier/route-graph-modifier";
import { SimpleRouteGraphModifier } from "../route-graph-modifier/simple-route-graph-modifier";

/**
 * Used in edge cases where the normal disruption types we have don't cut it.
 * Allows each use case of the disruption data (e.g. the display string, routing
 * graph modifications, etc.) to be provided manually.
 */
export class CustomDisruptionData extends DisruptionDataBase {
  constructor(
    readonly writeup: DisruptionWriteup,
    readonly edgesToRemove: readonly RouteGraphTrainEdge[],
    readonly edgesToAdd: readonly RouteGraphEdge[],
  ) {
    super();
  }

  static readonly bson = z
    .object({
      type: z.literal("custom"),
      writeup: DisruptionWriteup.bson,
      edgesToRemove: RouteGraphTrainEdge.bson.array(),
      edgesToAdd: routeGraphEdgeBson.array(),
    })
    .transform(
      (x) => new CustomDisruptionData(x.writeup, x.edgesToRemove, x.edgesToAdd),
    );

  toBson(): z.input<typeof CustomDisruptionData.bson> {
    return {
      type: "custom",
      writeup: this.writeup.toBson(),
      edgesToRemove: this.edgesToRemove.map((x) => x.toBson()),
      edgesToAdd: this.edgesToAdd.map((x) => x.toBson()),
    };
  }

  getWriteupAuthor(): DisruptionWriteupAuthor {
    return new CustomDisruptionWriteupAuthor(this);
  }

  getRouteGraphModifier(): RouteGraphModifier {
    return new SimpleRouteGraphModifier(this.edgesToRemove, this.edgesToAdd);
  }
}
