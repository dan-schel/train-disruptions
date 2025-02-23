import { z } from "zod";

export const LineStatusIndicatorPriorities = [
  // Never shown on the line status indicator.
  "hidden",

  // e.g. Station closure.
  "very-low",

  // e.g. Delays.
  "low",

  // e.g. Buses replace trains.
  "medium",

  // e.g. Line suspended.
  "high",
] as const;

export type LineStatusIndicatorPriority =
  (typeof LineStatusIndicatorPriorities)[number];

/**
 * The title, markdown description, etc. used in areas such as the disruption
 * page.
 */
export class DisruptionWriteup {
  constructor(
    /** Disruption page title. */
    public readonly title: string,
    /** Disruption page body. */
    public readonly bodyMarkdown: string,
    /** Line status indicator text on the overview page. */
    public readonly lineStatusIndicatorSummary: string,
    /**
     * In the case of multiple disruptions, defines which takes precedence on
     * the line status indicator.
     */
    public readonly lineStatusIndicatorPriority: LineStatusIndicatorPriority,
  ) {}

  static readonly bson = z
    .object({
      title: z.string(),
      bodyMarkdown: z.string(),
      lineStatusIndicatorSummary: z.string(),
      lineStatusIndicatorPriority: z.enum(LineStatusIndicatorPriorities),
    })
    .transform(
      (x) =>
        new DisruptionWriteup(
          x.title,
          x.bodyMarkdown,
          x.lineStatusIndicatorSummary,
          x.lineStatusIndicatorPriority,
        ),
    );

  toBson(): z.input<typeof DisruptionWriteup.bson> {
    return {
      title: this.title,
      bodyMarkdown: this.bodyMarkdown,
      lineStatusIndicatorSummary: this.lineStatusIndicatorSummary,
      lineStatusIndicatorPriority: this.lineStatusIndicatorPriority,
    };
  }
}
