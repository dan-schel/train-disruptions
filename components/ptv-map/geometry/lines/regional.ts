import { EAST_PAKENHAM } from "../../../../server/data/station-ids";
import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  caulfield,
  clayton,
  dandenong,
  flindersStreet,
  northMelbourne,
  pakenham,
  richmond,
  southernCross,
  southYarra,
} from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { southernCrossToNorthMelbourneRegional } from "../segments/southern-cross-to-north-melbourne";
import { defaultRadius, lineGap } from "../utils";
import * as loop from "../utils-city-loop";

/**
 * The Gippsland line, which is the only regional line (colored purple on the
 * map) to depart Southern Cross towards Flinders Street and ultimately heads
 * east.
 */
export const regionalEastern = new Line({
  origin: loop.pos.southernCross(loop.line.crossCity),
  angle: 45,
  color: "purple",

  path: new Path()
    .station(southernCross.point("regional-east"))
    .add(flindersStreetToSouthernCross(loop.line.regional, true).reverse())
    .station(flindersStreet.point("regional"))
    .add(flindersStreetToRichmond(loop.line.regional))
    .station(richmond.point("gippsland"))
    .straight(15)
    .station(southYarra.point("gippsland"))
    .straight(30)
    .station(caulfield.point("gippsland"))
    .straight(30)
    .station(clayton.point("gippsland"))
    .straight(30)
    .station(dandenong.point("gippsland"))
    .straight(20)
    .curve(defaultRadius + lineGap, -45)
    .straight(20)
    .station(pakenham.point("gippsland"))
    .straight(10)
    .station(EAST_PAKENHAM)
    .straight(10)
    .curve(defaultRadius, -45)
    .straight(10)
    .curve(defaultRadius, -45)
    .straight(50),
});

/**
 * The Ballarat, Bendigo, Geelong, and Seymour lines, which are regional lines
 * (colored purple on the map) that depart Southern Cross toward North
 * Melbourne/Footscray.
 */
export const regionalWestern = new Line({
  origin: loop.pos.southernCross(loop.line.dandenong),
  angle: 225,
  color: "purple",

  path: new Path()
    .station(southernCross.point("regional-west"))
    .add(
      southernCrossToNorthMelbourneRegional(
        new Path().station(northMelbourne.point("regional-seymour")),
      ),
    )
    .station(northMelbourne.point("regional-rrl")),
});
