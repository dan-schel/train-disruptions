// For demonstration purposes.

import { z } from "zod";
import { DatabaseModel, SerializedObject } from "../database-model";
import { FindQuery } from "../query-types";

export class Crayon {
  constructor(
    readonly id: string,
    readonly color: "red" | "yellow" | "green" | "blue",
    readonly length: number,
    readonly wrapped: boolean,
  ) {}
}

export class CrayonModel extends DatabaseModel<string, Crayon> {
  static instance = new CrayonModel();

  private schema = z.object({
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

  serialize(item: Crayon): SerializedObject {
    // Intentionally omit the ID. It's added by the database using getId().
    return {
      color: item.color,
      length: item.length,
      wrapped: item.wrapped,
    };
  }

  deserialize(id: string, item: SerializedObject): Crayon {
    const parsed = this.schema.parse(item);
    return new Crayon(id, parsed.color, parsed.length, parsed.wrapped);
  }

  getErrorForRequire(id: string): Error {
    return new Error(`No crayon with ID="${id}".`);
  }

  getErrorForRequireFirst(_query: FindQuery): Error {
    return new Error("No matching crayon found.");
  }

  getErrorForRequireSingle(_query: FindQuery, count: number): Error {
    return new Error(`${count} crayons matched. Expected 1.`);
  }
}
