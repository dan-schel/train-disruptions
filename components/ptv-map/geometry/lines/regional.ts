import { Line } from "../../lib/geometry";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { southernCrossToNorthMelbourneRegional } from "../segments/southern-cross-to-north-melbourne";
import { reversePath } from "../utils";
import * as loop from "../utils-city-loop";

/**
 * The Gippsland line, which is the only regional line (colored purple on the
 * map) to depart Southern Cross towards Flinders Street and ultimately heads
 * east.
 */
export const regionalEastern: Line = {
  origin: loop.pos.southernCross(loop.line.crossCity),
  angle: 45,
  color: "purple",
  path: [
    // Southern Cross
    ...reversePath(flindersStreetToSouthernCross(loop.line.regional, true)),
    // Flinders Street
    ...flindersStreetToRichmond(loop.line.regional),
    // Richmond
  ],
};

/**
 * The Ballarat, Bendigo, Geelong, and Seymour lines, which are regional lines
 * (colored purple on the map) that depart Southern Cross toward North
 * Melbourne/Footscray.
 */
export const regionalWestern: Line = {
  origin: loop.pos.southernCross(loop.line.dandenong),
  angle: 225,
  color: "purple",
  path: [
    // Southern Cross
    ...southernCrossToNorthMelbourneRegional([
      // North Melbourne (Seymour line branch)
    ]),
    // North Melbourne (RRL branch)
  ],
};
