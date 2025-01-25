// TODO: Station IDs should not be exclusive to the server.
//
// The OTHER station/line data should stay on the server, but the IDs can be
// shared (especially since we only import the ones we need, it shouldn't
// explode the bundle size).
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
  [
    [
      { point: "cross-city", position: "left-edge" },
      { point: "cross-city", position: "right-inner" },
    ],
    [
      { point: "dandenong", position: "left-inner" },
      { point: "northern", position: "right-edge" },
    ],
  ],
  [
    { point: "cross-city", position: "left-edge" },
    { point: "northern", position: "right-edge" },
  ],
);

export const flagstaff = Interchange.simple(
  FLAGSTAFF,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  "dandenong",
  "left-edge",
  "northern",
  "right-edge",
);

export const melbourneCentral = Interchange.simple(
  MELBOURNE_CENTRAL,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  "dandenong",
  "left-edge",
  "northern",
  "right-edge",
);

export const parliament = Interchange.simple(
  PARLIAMENT,
  ["northern", "clifton-hill", "burnley", "dandenong"] as const,
  "dandenong",
  "left-edge",
  "northern",
  "right-edge",
);

export const richmond = Interchange.simple(
  RICHMOND,
  ["sandringham", "frankston", "gippsland", "dandenong", "burnley"] as const,
  "burnley",
  "left-edge",
  "sandringham",
  "right-edge",
);

export const northMelbourne = new Interchange(
  NORTH_MELBOURNE,
  ["cross-city", "regional-rrl", "regional-seymour", "northern"] as const,
  [
    [
      { point: "cross-city", position: "left-edge" },
      { point: "cross-city", position: "right-inner" },
    ],
    [
      { point: "regional-seymour", position: "left-inner" },
      { point: "northern", position: "right-edge" },
    ],
  ],
  [
    { point: "cross-city", position: "left-edge" },
    { point: "northern", position: "right-edge" },
  ],
);

export const cliftonHill = Interchange.single(CLIFTON_HILL, "clifton-hill");

export const burnley = Interchange.single(BURNLEY, "burnley");

export const camberwell = Interchange.single(CAMBERWELL, "camberwell");

export const ringwood = Interchange.single(RINGWOOD, "ringwood");

export const southYarra = new Interchange(
  SOUTH_YARRA,
  ["sandringham", "frankston", "gippsland", "dandenong"] as const,
  [
    [
      { point: "dandenong", position: "left-edge" },
      { point: "dandenong", position: "right-inner" },
    ],
    [
      { point: "frankston", position: "left-inner" },
      { point: "sandringham", position: "right-edge" },
    ],
  ],
  [
    { point: "dandenong", position: "left-edge" },
    { point: "sandringham", position: "right-edge" },
  ],
);

export const caulfield = Interchange.simple(
  CAULFIELD,
  ["frankston", "gippsland", "dandenong"] as const,
  "dandenong",
  "left-edge",
  "frankston",
  "right-edge",
);

export const clayton = Interchange.simple(
  CLAYTON,
  ["gippsland", "dandenong"] as const,
  "dandenong",
  "left-edge",
  "gippsland",
  "right-edge",
);

export const dandenong = Interchange.simple(
  DANDENONG,
  ["gippsland", "dandenong"] as const,
  "dandenong",
  "left-edge",
  "gippsland",
  "right-edge",
);

export const pakenham = Interchange.simple(
  PAKENHAM,
  ["gippsland", "pakenham"] as const,
  "pakenham",
  "left-edge",
  "gippsland",
  "right-edge",
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
  "left-edge",
  "stony-point",
  "right-edge",
);

export const broadmeadows = Interchange.simple(
  BROADMEADOWS,
  ["craigieburn", "seymour"] as const,
  "seymour",
  "left-edge",
  "craigieburn",
  "right-edge",
);

export const craigieburn = Interchange.simple(
  CRAIGIEBURN,
  ["craigieburn", "seymour"] as const,
  "seymour",
  "left-edge",
  "craigieburn",
  "right-edge",
);

export const seymour = Interchange.single(SEYMOUR, "seymour");

export const newport = Interchange.single(NEWPORT, "cross-city");

export const laverton = Interchange.single(LAVERTON, "werribee");

export const sunshine = new Interchange(
  SUNSHINE,
  ["sunbury", "bendigo", "deer-park"] as const,
  [
    [
      { point: "deer-park", position: "left-edge" },
      { point: "deer-park", position: "right-edge" },
    ],
    [
      { point: "sunbury", position: "left-inner" },
      { point: "sunbury", position: "right-edge" },
    ],
  ],
  [
    { point: "deer-park", position: "left-edge" },
    { point: "deer-park", position: "right-edge" },
    { point: "sunbury", position: "right-edge" },
  ],
);

export const watergardens = Interchange.simple(
  WATERGARDENS,
  ["sunbury", "bendigo"] as const,
  "bendigo",
  "left-edge",
  "sunbury",
  "right-edge",
);

export const sunbury = Interchange.simple(
  SUNBURY,
  ["sunbury", "bendigo"] as const,
  "bendigo",
  "left-edge",
  "sunbury",
  "right-edge",
);

export const bendigo = Interchange.single(BENDIGO, "bendigo");

export const ballarat = Interchange.single(BALLARAT, "ballarat");

export const deerPark = Interchange.single(DEER_PARK, "deer-park");
