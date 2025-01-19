import { Line } from "../../lib/geometry";
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
  path: [
    // Flinders Street
    ...flindersStreetToSouthernCross(1, false),
    // Southern Cross
    ...southernCrossToFlagstaff(1),
    // Flagstaff
    ...flagstaffToParliament(1),
    // Parliament
    ...jolimontLoopPortal(),
    // Jolimont
  ],
};
