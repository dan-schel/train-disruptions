import { configDotenv } from "dotenv";
import { z } from "zod";
import { stringNumberSchema } from "@/server/utils";

const schema = z.object({
  RELAY_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  DISCORD_DEPLOYMENT_WEBHOOK: z.string().optional(),
  COMMIT_HASH: z.string().optional(),
  USER_NAME: z.string().optional(),
  PASSWORD: z.string().optional(),

  NODE_ENV: z.enum(["production", "development"]).default("development"),
  TZ: z.literal("Etc/UTC"),
  NPM_CONFIG_PRODUCTION: z.string().default("false"),
  PORT: stringNumberSchema.default("3000"),
  HMR_PORT: stringNumberSchema.default("24678"),
});

// Loads environment variables from the `.env` file into process.env.
configDotenv();

// Parses process.env using the schema (i.e. checks that `RELAY_KEY`,
// `DATABASE_URL`, etc. are there), and makes them available in the "env"
// constant for other code to use.
export const env = schema.parse(process.env);
