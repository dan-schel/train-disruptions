import { z } from "zod";

/** The title, markdown description, etc. used by the disruption page. */
export class DisruptionWriteup {
  constructor(
    public readonly title: string,
    public readonly descriptionMarkdown: string,
  ) {}

  static readonly bson = z
    .object({
      title: z.string(),
      descriptionMarkdown: z.string(),
    })
    .transform((x) => new DisruptionWriteup(x.title, x.descriptionMarkdown));

  toBson(): z.input<typeof DisruptionWriteup.bson> {
    return {
      title: this.title,
      descriptionMarkdown: this.descriptionMarkdown,
    };
  }
}
