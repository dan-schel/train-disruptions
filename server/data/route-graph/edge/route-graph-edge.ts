import { z } from "zod";
import { RouteGraphAlternativeEdge } from "@/server/data/route-graph/edge/route-graph-alternative-edge";
import { RouteGraphTrainEdge } from "@/server/data/route-graph/edge/route-graph-train-edge";

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
