import { z } from "zod";

export const DisruptionWriteupInputJson = z.object({
  title: z.string(),
  bodyMarkdown: z.string(),
  summary: z.object({
    headline: z.string().nullable(),
    subject: z.string(),
    period: z.string().nullable(),
    iconType: z.enum(["line", "cross", "altered-route", "traffic"]),
  }),
  lineStatusIndicator: z.object({
    summary: z.string(),
    priority: z.enum(["low", "medium", "high"]),
  }),
});
export type DisruptionWriteupInput = z.infer<typeof DisruptionWriteupInputJson>;
