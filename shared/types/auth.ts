import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().nonempty("This field is required"),
  password: z.string().nonempty("This field is required"),
});
