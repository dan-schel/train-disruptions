import { z } from "zod";
import { DisruptionWriteupInputJson } from "@/shared/schemas/alert-processing/disruption-writeup-input";

export type DisruptionWriteupInput = z.input<typeof DisruptionWriteupInputJson>;
