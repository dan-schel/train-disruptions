import { RICHMOND } from "../../../../server/data/station-ids";
import { interchangeMarker, Line } from "../../lib/geometry";
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
  path: [
    // Flinders Street
    ...flindersStreetToSouthernCross(2, false),
    // Southern Cross
    ...southernCrossToFlagstaff(2),
    // Flagstaff
    ...flagstaffToParliament(2),
    // Parliament
    ...richmondLoopPortal(loop.line.burnley, 25),
    interchangeMarker({ id: RICHMOND }),
  ],
};
