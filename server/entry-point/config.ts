// Serves a similar purpose to env.ts, but for non-secret configuration values.

const VTAR_URL = "https://vtar.trainquery.com";
const DATABASE_NAME = "train-disruptions";

export const config = {
  DATABASE_NAME,
  VTAR_URL,
};
