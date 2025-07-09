import { z } from "zod";
import {
  RouteGraphAlternativeEdgeInputJson,
  RouteGraphTrainEdgeInputJson,
  RouteGraphEdgeInputJson,
} from "@/shared/schemas/alert-processing/route-graph-edge-input";

export type RouteGraphAlternativeEdgeInput = z.input<
  typeof RouteGraphAlternativeEdgeInputJson
>;

export type RouteGraphTrainEdgeInput = z.input<
  typeof RouteGraphTrainEdgeInputJson
>;

export type RouteGraphEdgeInput = z.input<typeof RouteGraphEdgeInputJson>;
