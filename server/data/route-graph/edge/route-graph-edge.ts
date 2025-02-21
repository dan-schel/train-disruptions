import { z } from "zod";
import { RouteGraphAlternativeEdge } from "./route-graph-alternative-edge";
import { RouteGraphTrainEdge } from "./route-graph-train-edge";

/**
 * Defines an edge connecting to stations in the route graph.
 *
 * (All implementations of RouteGraphEdgeBase.)
 */
export type RouteGraphEdge = RouteGraphTrainEdge | RouteGraphAlternativeEdge;

export const routeGraphEdgeBson = z.union([
  RouteGraphTrainEdge.bson,
  RouteGraphAlternativeEdge.bson,
]);
