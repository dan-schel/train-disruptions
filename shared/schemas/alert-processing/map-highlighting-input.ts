import { z } from "zod";

export const MapHighlightingInputJson = z.object({
  segments: z
    .object({
      segment: z.object({
        mapNodeA: z.number(),
        mapNodeB: z.number(),
        percentage: z.object({
          min: z.number(),
          max: z.number(),
        }),
      }),
      style: z.literal("standard"),
    })
    .array(),
  points: z
    .object({
      point: z.object({
        segmentANodeA: z.number(),
        segmentANodeB: z.number(),
        segmentBNodeA: z.number(),
        segmentBNodeB: z.number(),
        percentage: z.number(),
      }),
      style: z.enum(["standard", "delayed"]),
    })
    .array(),
});
export type MapHighlightingInput = z.infer<typeof MapHighlightingInputJson>;
