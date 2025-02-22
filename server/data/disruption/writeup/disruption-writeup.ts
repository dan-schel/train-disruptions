import { z } from "zod";

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
    public readonly overviewSummary: string,
  ) {}

  static readonly bson = z
    .object({
      title: z.string(),
      bodyMarkdown: z.string(),
      overviewSummary: z.string(),
    })
    .transform(
      (x) => new DisruptionWriteup(x.title, x.bodyMarkdown, x.overviewSummary),
    );

  toBson(): z.input<typeof DisruptionWriteup.bson> {
    return {
      title: this.title,
      bodyMarkdown: this.bodyMarkdown,
      overviewSummary: this.overviewSummary,
    };
  }
}
