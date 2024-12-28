// For demonstration purposes.

import { z } from "zod";
import { DatabaseModel } from "../general/database-model";

export class Crayon {
  constructor(
    readonly id: string,
    readonly color: "red" | "yellow" | "green" | "blue",
    readonly length: number,
    readonly wrapped: boolean,
  ) {}
}

export class CrayonModel extends DatabaseModel<
  string,
  Crayon,
  z.input<typeof CrayonModel.schema>
> {
  static instance = new CrayonModel();

  // All fields except the ID.
  private static schema = z.object({
    color: z.enum(["red", "yellow", "green", "blue"]),
    length: z.number(),
    wrapped: z.boolean(),
  });

  private constructor() {
    super("crayons");
  }

  getId(item: Crayon): string {
    return item.id;
  }

  serialize(item: Crayon): z.input<typeof CrayonModel.schema> {
    return {
      color: item.color,
      length: item.length,
      wrapped: item.wrapped,
    };
  }

  deserialize(id: string, item: unknown): Crayon {
    const parsed = CrayonModel.schema.parse(item);
    return new Crayon(id, parsed.color, parsed.length, parsed.wrapped);
  }
}
