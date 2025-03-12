// For demonstration purposes. Delete this once we've got the first real model.

import { z } from "zod";
import { DatabaseModel } from "@/server/database/lib/general/database-model";

/**
 * The class returned by the database.
 *
 * (There's no reason this code needs to be stored here under
 * `server/database/models`, this could be anything!)
 */
export class Crayon {
  constructor(
    readonly id: string,
    readonly color: "red" | "yellow" | "green" | "blue",
    readonly usesLeft: number,
    readonly drawings: string[],
  ) {}
}

/** Knows how to convert Crayon objects into database records. */
export class CrayonModel extends DatabaseModel<
  Crayon,
  string,
  z.input<typeof CrayonModel.schema>
> {
  static instance = new CrayonModel();

  // All fields except the ID.
  private static schema = z.object({
    color: z.enum(["red", "yellow", "green", "blue"]),
    usesLeft: z.number(),
    drawings: z.string().array(),
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
      usesLeft: item.usesLeft,
      drawings: item.drawings,
    };
  }

  deserialize(id: string, item: unknown): Crayon {
    const parsed = CrayonModel.schema.parse(item);
    return new Crayon(id, parsed.color, parsed.usesLeft, parsed.drawings);
  }
}
