import { z } from "zod";
import {
  RouteGraphAlternativeEdgeInputJson,
  RouteGraphTrainEdgeInputJson,
  RouteGraphEdgeInputJson,
} from "@/shared/schemas/alert-processing/route-graph-edge-input";

export type RouteGraphAlternativeEdgeInputFromJson = z.input<
  typeof RouteGraphAlternativeEdgeInputJson
>;

export type RouteGraphTrainEdgeInputFromJson = z.input<
  typeof RouteGraphTrainEdgeInputJson
>;

export type RouteGraphEdgeInputFromJson = z.input<
  typeof RouteGraphEdgeInputJson
>;
