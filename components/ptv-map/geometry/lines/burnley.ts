import {
  FLAGSTAFF,
  FLINDERS_STREET,
  PARLIAMENT,
  RICHMOND,
  SOUTHERN_CROSS,
} from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "../segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import * as loop from "../utils-city-loop";

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley: Line = {
  origin: loop.pos.flindersStreet(loop.line.burnley),
  angle: 180,
  color: "blue",

  path: new Path()
    .station(FLINDERS_STREET)
    .add(flindersStreetToSouthernCross(2, true))
    .station(SOUTHERN_CROSS)
    .add(southernCrossToFlagstaff(2))
    .station(FLAGSTAFF)
    .add(flagstaffToParliament(2))
    .station(PARLIAMENT)
    .add(richmondLoopPortal(loop.line.burnley, 25))
    .interchange(RICHMOND),
};
