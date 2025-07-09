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

export type LineSectionInput = z.input<typeof LineSectionInputJson>;

export type CustomDisruptionDataInput = z.input<
  typeof CustomDisruptionDataInputJson
>;

export type StationClosureDisruptionDataInput = z.input<
  typeof StationClosureDisruptionDataInputJson
>;

export type BusReplacementsDisruptionDataInput = z.input<
  typeof BusReplacementsDisruptionDataInputJson
>;

export type DelaysDisruptionDataInput = z.input<
  typeof DelaysDisruptionDataInputJson
>;

export type NoCityLoopDisruptionDataInput = z.input<
  typeof NoCityLoopDisruptionDataInputJson
>;

export type DisruptionDataInput = z.input<typeof DisruptionDataInputJson>;
