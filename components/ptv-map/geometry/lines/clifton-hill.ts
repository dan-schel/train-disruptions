import {
  FLAGSTAFF,
  FLINDERS_STREET,
  JOLIMONT,
  PARLIAMENT,
  SOUTHERN_CROSS,
} from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { jolimontLoopPortal } from "../segments/jolimont-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import * as loop from "../utils-city-loop";

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill: Line = {
  origin: loop.pos.flindersStreet(loop.line.cliftonHill),
  angle: 180,
  color: "red",

  path: new Path()
    .station(FLINDERS_STREET)
    .add(flindersStreetToSouthernCross(1, false))
    .station(SOUTHERN_CROSS)
    .add(southernCrossToFlagstaff(1))
    .station(FLAGSTAFF)
    .add(flagstaffToParliament(1))
    .station(PARLIAMENT)
    .add(jolimontLoopPortal())
    .station(JOLIMONT),
};
