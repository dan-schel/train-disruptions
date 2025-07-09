import { z } from "zod";

export const RouteGraphAlternativeEdgeInputJson = z.object({
  stationA: z.number(),
  stationB: z.number(),
  mode: z.enum(["bus", "tram", "walk"]),
});

export const RouteGraphTrainEdgeInputJson = z.object({
  stationA: z.number(),
  stationB: z.number(),
  line: z.number(),
  isRegionalTrain: z.boolean(),
});

export const RouteGraphEdgeInputJson = z.discriminatedUnion("type", [
  z
    .object({ type: z.literal("alternative") })
    .merge(RouteGraphAlternativeEdgeInputJson),
  z.object({ type: z.literal("train") }).merge(RouteGraphTrainEdgeInputJson),
]);
