import { DatabaseModel } from "@/server/database/lib/general/database-model";
import { z } from "zod";

export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly password: string,
    readonly role: "super" | "admin",
    readonly discord: string | null,
  ) {}
}

export class UserModel extends DatabaseModel<
  User,
  string,
  z.input<typeof UserModel.schema>
> {
  static instance = new UserModel();
  private static schema = z.object({
    username: z.string(),
    password: z.string(),
    role: z.enum(["super", "admin"]),
    discord: z.string().nullable(),
  });

  private constructor() {
    super("users");
  }

  getId(item: User): string {
    return item.id;
  }

  serialize(item: User): {
    username: string;
    password: string;
    role: "super" | "admin";
    discord: string | null;
  } {
    return {
      username: item.username,
      password: item.password,
      role: item.role,
      discord: item.discord,
    };
  }

  deserialize(id: string, item: unknown): User {
    const parsed = UserModel.schema.parse(item);
    return new User(
      id,
      parsed.username,
      parsed.password,
      parsed.role,
      parsed.discord,
    );
  }
}
