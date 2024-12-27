// Serves a similar purpose to env.ts, but for non-secret configuration values.

const VTAR_ENDPOINT_URL = "https://vtar.trainquery.com/ptv-disruptions.json";
const DATABASE_NAME = "train-disruptions";

export const config = {
  DATABASE_NAME,
  VTAR_ENDPOINT_URL,
};
