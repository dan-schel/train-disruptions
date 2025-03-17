import { DatabaseModel } from "@/server/database/lib/general/database-model";
import { z } from "zod";

export class User {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly password: string,
    readonly role: "super" | "admin",
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
  } {
    return {
      username: item.username,
      password: item.password,
      role: item.role,
    };
  }

  deserialize(id: string, item: unknown): User {
    const parsed = UserModel.schema.parse(item);
    return new User(id, parsed.username, parsed.password, parsed.role);
  }
}
