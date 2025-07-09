import { z } from "zod";
import {
  LineSectionInputJson,
  CustomDisruptionDataInputJson,
  StationClosureDisruptionDataInputJson,
  BusReplacementsDisruptionDataInputJson,
  DelaysDisruptionDataInputJson,
  NoCityLoopDisruptionDataInputJson,
  DisruptionDataInputJson,
} from "@/shared/schemas/alert-processing/disruption-data-input";

export type LineSectionInputFromJson = z.input<typeof LineSectionInputJson>;

export type CustomDisruptionDataInputFromJson = z.input<
  typeof CustomDisruptionDataInputJson
>;

export type StationClosureDisruptionDataInputFromJson = z.input<
  typeof StationClosureDisruptionDataInputJson
>;

export type BusReplacementsDisruptionDataInputFromJson = z.input<
  typeof BusReplacementsDisruptionDataInputJson
>;

export type DelaysDisruptionDataInputFromJson = z.input<
  typeof DelaysDisruptionDataInputJson
>;

export type NoCityLoopDisruptionDataInputFromJson = z.input<
  typeof NoCityLoopDisruptionDataInputJson
>;

export type DisruptionDataInputFromJson = z.input<
  typeof DisruptionDataInputJson
>;
