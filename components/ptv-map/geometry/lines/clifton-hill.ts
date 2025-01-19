import { JOLIMONT } from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path/path";
import {
  flagstaff,
  flindersStreet,
  parliament,
  southernCross,
} from "../interchanges";
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
    .station(flindersStreet.point("clifton-hill-loop"))
    .add(flindersStreetToSouthernCross(1, false))
    .station(southernCross.point("clifton-hill"))
    .add(southernCrossToFlagstaff(1))
    .station(flagstaff.point("clifton-hill"))
    .add(flagstaffToParliament(1, "clifton-hill"))
    .station(parliament.point("clifton-hill"))
    .add(jolimontLoopPortal())
    .station(JOLIMONT),
};
