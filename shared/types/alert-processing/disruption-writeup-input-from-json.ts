import { z } from "zod";
import { DisruptionWriteupInputJson } from "@/shared/schemas/alert-processing/disruption-writeup-input";

export type DisruptionWriteupInputFromJson = z.input<
  typeof DisruptionWriteupInputJson
>;
