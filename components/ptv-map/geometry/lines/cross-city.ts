// TODO: [DS] Station IDs should not be exclusive to the server. We need them on
// the frontend here. The OTHER station/line data should stay on the server, but
// the IDs can be shared (especially since we only import the ones we need, it
// shouldn't explode the bundle size).
import {
  SOUTHERN_CROSS,
  NORTH_MELBOURNE,
  FLINDERS_STREET,
  RICHMOND,
} from "../../../../server/data/station-ids";

import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { southernCrossToNorthMelbourne } from "../segments/southern-cross-to-north-melbourne";
import * as loop from "../utils-city-loop";

/**
 * The Frankston line, which makes up the eastern half of the "Cross City" group
 * (colored green on the map).
 */
export const crossCityEastern: Line = {
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 0,
  color: "green",

  path: new Path()
    .station(FLINDERS_STREET)
    .add(flindersStreetToRichmond(loop.line.crossCity))
    .station(RICHMOND),
};

/**
 * The Werribee and Williamstown lines, which make up the western half of the
 * "Cross City" group (colored green on the map).
 */
export const crossCityWestern: Line = {
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 180,
  color: "green",

  path: new Path()
    .station(FLINDERS_STREET)
    .add(flindersStreetToSouthernCross(5, false))
    .interchange(SOUTHERN_CROSS)
    .add(southernCrossToNorthMelbourne(5))
    .interchange(NORTH_MELBOURNE),
};
