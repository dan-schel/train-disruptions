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
export type LineSectionInput = z.input<typeof LineSectionInputJson>;

export const CustomDisruptionDataInputJson = z.object({
  impactedLines: z.number().array(),
  writeup: DisruptionWriteupInputJson,
  edgesToRemove: RouteGraphTrainEdgeInputJson.array(),
  edgesToAdd: RouteGraphEdgeInputJson.array(),
  highlighting: MapHighlightingInputJson,
});
export type CustomDisruptionDataInput = z.input<
  typeof CustomDisruptionDataInputJson
>;

export const StationClosureDisruptionDataInputJson = z.object({
  stationId: z.number(),
});
export type StationClosureDisruptionDataInput = z.input<
  typeof StationClosureDisruptionDataInputJson
>;

export const BusReplacementsDisruptionDataInputJson = z.object({
  sections: LineSectionInputJson.array(),
});
export type BusReplacementsDisruptionDataInput = z.input<
  typeof BusReplacementsDisruptionDataInputJson
>;

export const DelaysDisruptionDataInputJson = z.object({
  stationId: z.number(),
  delayInMinutes: z.number(),
  sections: LineSectionInputJson.array(),
});
export type DelaysDisruptionDataInput = z.input<
  typeof DelaysDisruptionDataInputJson
>;

export const NoCityLoopDisruptionDataInputJson = z.object({
  lineIds: z.number().array(),
});
export type NoCityLoopDisruptionDataInput = z.input<
  typeof NoCityLoopDisruptionDataInputJson
>;

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
export type DisruptionDataInput = z.input<typeof DisruptionDataInputJson>;
