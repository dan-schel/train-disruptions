// TODO: [DS] Station IDs should not be exclusive to the server. We need them on
// the frontend here. The OTHER station/line data should stay on the server, but
// the IDs can be shared (especially since we only import the ones we need, it
// shouldn't explode the bundle size).
import {
  BURNLEY,
  CAMBERWELL,
  CAULFIELD,
  CLAYTON,
  CLIFTON_HILL,
  DANDENONG,
  FLAGSTAFF,
  FLINDERS_STREET,
  MELBOURNE_CENTRAL,
  NORTH_MELBOURNE,
  PAKENHAM,
  PARLIAMENT,
  RICHMOND,
  RINGWOOD,
  SOUTH_YARRA,
  SOUTHERN_CROSS,
} from "../../../server/data/station-ids";

import { Interchange } from "../lib/interchange";

export const flindersStreet = new Interchange(
  FLINDERS_STREET,
  [
    "northern-direct",
    "northern-loop",
    "clifton-hill-direct",
    "clifton-hill-loop",
    "burnley-direct",
    "burnley-loop",
    "dandenong-direct",
    "dandenong-loop",
    "regional",
    "cross-city-east",
    "cross-city-west",
    "sandringham",
  ] as const,
  ["northern-direct", "sandringham"],
);

export const southernCross = new Interchange(
  SOUTHERN_CROSS,
  [
    "northern",
    "clifton-hill",
    "burnley",
    "dandenong",
    "regional-east",
    "regional-west",
    "cross-city",
  ] as const,
  ["northern", "cross-city"],
);

export const flagstaff = new Interchange(
  FLAGSTAFF,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  ["northern", "dandenong"],
);

export const melbourneCentral = new Interchange(
  MELBOURNE_CENTRAL,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  ["northern", "dandenong"],
);

export const parliament = new Interchange(
  PARLIAMENT,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  ["northern", "dandenong"],
);

export const richmond = new Interchange(
  RICHMOND,
  ["sandringham", "frankston", "gippsland", "dandenong", "burnley"] as const,
  ["sandringham", "burnley"],
);

export const northMelbourne = new Interchange(
  NORTH_MELBOURNE,
  ["cross-city", "regional-rrl", "regional-seymour", "northern"] as const,
  ["cross-city", "northern"],
);

export const cliftonHill = new Interchange(
  CLIFTON_HILL,
  ["clifton-hill"] as const,
  ["clifton-hill"],
);

export const burnley = new Interchange(BURNLEY, ["burnley"] as const, [
  "burnley",
]);

export const camberwell = new Interchange(CAMBERWELL, ["camberwell"] as const, [
  "camberwell",
]);

export const ringwood = new Interchange(RINGWOOD, ["ringwood"] as const, [
  "ringwood",
]);

export const southYarra = new Interchange(
  SOUTH_YARRA,
  ["sandringham", "frankston", "gippsland", "dandenong"] as const,
  ["sandringham", "dandenong"],
);

export const caulfield = new Interchange(
  CAULFIELD,
  ["frankston", "gippsland", "dandenong"] as const,
  ["frankston", "dandenong"],
);

export const clayton = new Interchange(
  CLAYTON,
  ["gippsland", "dandenong"] as const,
  ["gippsland", "dandenong"],
);

export const dandenong = new Interchange(
  DANDENONG,
  ["gippsland", "dandenong"] as const,
  ["gippsland", "dandenong"],
);

export const pakenham = new Interchange(
  PAKENHAM,
  ["gippsland", "pakenham"] as const,
  ["gippsland", "pakenham"],
);
