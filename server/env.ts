import { configDotenv } from "dotenv";
import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.string().default("development"),

  // TODO: These can't really be optional in the long run, but they are for now
  // while everyone gets set up.
  RELAY_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
});

// Loads environment variables from the .env file into process.env.
configDotenv();

// Parses process.env using the schema (i.e. checks that NODE_ENV, RELAY_KEY,
// etc. are there), and makes them available in the "env" constant for other
// code to use.
export const env = schema.parse(process.env);
