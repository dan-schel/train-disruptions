import { DisruptionWriteupInput } from "@/shared/types/alert-processing/disruption-writeup-input";
import { MapHighlightingInput } from "@/shared/types/alert-processing/map-highlighting-input";
import {
  RouteGraphEdgeInput,
  RouteGraphTrainEdgeInput,
} from "@/shared/types/alert-processing/route-graph-edge-input";

export type LineSectionInput = {
  line: number;
  a: number | "the-city";
  b: number | "the-city";
};

export type CustomDisruptionDataInput = {
  impactedLines: number[];
  writeup: DisruptionWriteupInput;
  edgesToRemove: RouteGraphTrainEdgeInput[];
  edgesToAdd: RouteGraphEdgeInput[];
  highlighting: MapHighlightingInput;
};

export type StationClosureDisruptionDataInput = {
  stationId: number;
};

export type BusReplacementsDisruptionDataInput = {
  sections: LineSectionInput[];
};

export type DelaysDisruptionDataInput = {
  stationId: number;
  delayInMinutes: number;
  sections: LineSectionInput[];
};

export type NoCityLoopDisruptionDataInput = {
  lineIds: number[];
};

export type DisruptionDataInput =
  | ({ type: "custom" } & CustomDisruptionDataInput)
  | ({ type: "station-closure" } & StationClosureDisruptionDataInput)
  | ({ type: "bus-replacements" } & BusReplacementsDisruptionDataInput)
  | ({ type: "delays" } & DelaysDisruptionDataInput)
  | ({ type: "no-city-loop" } & NoCityLoopDisruptionDataInput);
