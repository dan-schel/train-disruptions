// TODO: [DS] Station IDs should not be exclusive to the server. We need them on
// the frontend here. The OTHER station/line data should stay on the server, but
// the IDs can be shared (especially since we only import the ones we need, it
// shouldn't explode the bundle size).
import {
  BALLARAT,
  BENDIGO,
  BROADMEADOWS,
  BURNLEY,
  CAMBERWELL,
  CAULFIELD,
  CLAYTON,
  CLIFTON_HILL,
  CRAIGIEBURN,
  DANDENONG,
  DEER_PARK,
  FLAGSTAFF,
  FLINDERS_STREET,
  FOOTSCRAY,
  FRANKSTON,
  LAVERTON,
  MELBOURNE_CENTRAL,
  NEWPORT,
  NORTH_MELBOURNE,
  PAKENHAM,
  PARLIAMENT,
  RICHMOND,
  RINGWOOD,
  SEYMOUR,
  SOUTH_YARRA,
  SOUTHERN_CROSS,
  SUNBURY,
  SUNSHINE,
  WATERGARDENS,
} from "../../../server/data/station-ids";

import { Interchange } from "../lib/interchange";

export const flindersStreet = Interchange.simple(
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
  "northern-direct",
  "right-edge",
  "sandringham",
  "right-edge",
);

export const southernCross = Interchange.simple(
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
  "northern",
  "right-edge",
  "cross-city",
  "left-edge",
);

export const flagstaff = Interchange.simple(
  FLAGSTAFF,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  "northern",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const melbourneCentral = Interchange.simple(
  MELBOURNE_CENTRAL,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  "northern",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const parliament = Interchange.simple(
  PARLIAMENT,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  "northern",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const richmond = Interchange.simple(
  RICHMOND,
  ["sandringham", "frankston", "gippsland", "dandenong", "burnley"] as const,
  "sandringham",
  "right-edge",
  "burnley",
  "left-edge",
);

export const northMelbourne = Interchange.simple(
  NORTH_MELBOURNE,
  ["cross-city", "regional-rrl", "regional-seymour", "northern"] as const,
  "cross-city",
  "left-edge",
  "northern",
  "right-edge",
);

export const cliftonHill = Interchange.single(CLIFTON_HILL, "clifton-hill");

export const burnley = Interchange.single(BURNLEY, "burnley");

export const camberwell = Interchange.single(CAMBERWELL, "camberwell");

export const ringwood = Interchange.single(RINGWOOD, "ringwood");

export const southYarra = Interchange.simple(
  SOUTH_YARRA,
  ["sandringham", "frankston", "gippsland", "dandenong"] as const,
  "sandringham",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const caulfield = Interchange.simple(
  CAULFIELD,
  ["frankston", "gippsland", "dandenong"] as const,
  "frankston",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const clayton = Interchange.simple(
  CLAYTON,
  ["gippsland", "dandenong"] as const,
  "gippsland",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const dandenong = Interchange.simple(
  DANDENONG,
  ["gippsland", "dandenong"] as const,
  "gippsland",
  "right-edge",
  "dandenong",
  "left-edge",
);

export const pakenham = Interchange.simple(
  PAKENHAM,
  ["gippsland", "pakenham"] as const,
  "gippsland",
  "right-edge",
  "pakenham",
  "left-edge",
);

export const footscray = Interchange.simple(
  FOOTSCRAY,
  ["cross-city", "regional", "sunbury"] as const,
  "cross-city",
  "left-edge",
  "sunbury",
  "right-edge",
);

export const frankston = Interchange.simple(
  FRANKSTON,
  ["frankston", "stony-point"] as const,
  "frankston",
  "right-edge",
  "stony-point",
  "left-edge",
);

export const broadmeadows = Interchange.simple(
  BROADMEADOWS,
  ["craigieburn", "seymour"] as const,
  "craigieburn",
  "right-edge",
  "seymour",
  "left-edge",
);

export const craigieburn = Interchange.simple(
  CRAIGIEBURN,
  ["craigieburn", "seymour"] as const,
  "craigieburn",
  "right-edge",
  "seymour",
  "left-edge",
);

export const seymour = Interchange.single(SEYMOUR, "seymour");

export const newport = Interchange.single(NEWPORT, "cross-city");

export const laverton = Interchange.single(LAVERTON, "werribee");

export const sunshine = Interchange.simple(
  SUNSHINE,
  ["sunbury", "bendigo", "deer-park"] as const,
  "sunbury",
  "right-edge",
  "deer-park",
  "left-edge",
);

export const watergardens = Interchange.simple(
  WATERGARDENS,
  ["sunbury", "bendigo"] as const,
  "sunbury",
  "right-edge",
  "bendigo",
  "left-edge",
);

export const sunbury = Interchange.simple(
  SUNBURY,
  ["sunbury", "bendigo"] as const,
  "sunbury",
  "right-edge",
  "bendigo",
  "left-edge",
);

export const bendigo = Interchange.single(BENDIGO, "bendigo");

export const ballarat = Interchange.single(BALLARAT, "ballarat");

export const deerPark = Interchange.single(DEER_PARK, "deer-park");
