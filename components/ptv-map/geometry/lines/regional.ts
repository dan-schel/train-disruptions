import {
  FLINDERS_STREET,
  NORTH_MELBOURNE,
  RICHMOND,
  SOUTHERN_CROSS,
} from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { southernCrossToNorthMelbourneRegional } from "../segments/southern-cross-to-north-melbourne";
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

  path: new Path()
    .station(SOUTHERN_CROSS)
    .add(flindersStreetToSouthernCross(loop.line.regional, true).reverse())
    .station(FLINDERS_STREET)
    .add(flindersStreetToRichmond(loop.line.regional))
    .station(RICHMOND),
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

  path: new Path()
    .station(SOUTHERN_CROSS)
    .add(
      southernCrossToNorthMelbourneRegional(
        new Path().station(NORTH_MELBOURNE),
      ),
    )
    .station(NORTH_MELBOURNE),
};
