import { z } from "zod";
import { DisruptionWriteupInputJson } from "@/shared/schemas/alert-processing/disruption-writeup-input";
import { MapHighlightingInputJson } from "@/shared/schemas/alert-processing/map-highlighting-input";
import {
  RouteGraphEdgeInputJson,
  RouteGraphTrainEdgeInputJson,
} from "@/shared/schemas/alert-processing/route-graph-edge-input";

export const LineSectionInputJson = z.object({
  line: z.number(),
  a: z.union([z.number(), z.literal("the-city")]),
  b: z.union([z.number(), z.literal("the-city")]),
});

export const CustomDisruptionDataInputJson = z.object({
  impactedLines: z.array(z.number()),
  writeup: DisruptionWriteupInputJson,
  edgesToRemove: z.array(RouteGraphTrainEdgeInputJson),
  edgesToAdd: z.array(RouteGraphEdgeInputJson),
  highlighting: MapHighlightingInputJson,
});

export const StationClosureDisruptionDataInputJson = z.object({
  stationId: z.number(),
});

export const BusReplacementsDisruptionDataInputJson = z.object({
  sections: z.array(LineSectionInputJson),
});

export const DelaysDisruptionDataInputJson = z.object({
  stationId: z.number(),
  delayInMinutes: z.number(),
  sections: z.array(LineSectionInputJson),
});

export const NoCityLoopDisruptionDataInputJson = z.object({
  lineIds: z.array(z.number()),
});

export const DisruptionDataInputJson = z.discriminatedUnion("type", [
  z.object({ type: z.literal("custom") }).merge(CustomDisruptionDataInputJson),
  z
    .object({ type: z.literal("station-closure") })
    .merge(StationClosureDisruptionDataInputJson),
  z
    .object({ type: z.literal("bus-replacements") })
    .merge(BusReplacementsDisruptionDataInputJson),
  z.object({ type: z.literal("delays") }).merge(DelaysDisruptionDataInputJson),
  z
    .object({ type: z.literal("no-city-loop") })
    .merge(NoCityLoopDisruptionDataInputJson),
]);
