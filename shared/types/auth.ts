import { z } from "zod";

export const loginSchema = z.object(
  {
    username: z
      .string({ error: "Required" })
      .nonempty("This field is required"),
    password: z
      .string({ error: "Required" })
      .nonempty("This field is required"),
  },
  { error: "Required" },
);
