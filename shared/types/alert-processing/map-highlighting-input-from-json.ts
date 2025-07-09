import { z } from "zod";
import { MapHighlightingInputJson } from "@/shared/schemas/alert-processing/map-highlighting-input";

export type MapHighlightingInputFromJson = z.input<
  typeof MapHighlightingInputJson
>;
