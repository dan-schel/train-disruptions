import { EAST_PAKENHAM } from "../../../../server/data/station-ids";
import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  caulfield,
  clayton,
  dandenong,
  flindersStreet,
  footscray,
  northMelbourne,
  pakenham,
  richmond,
  southernCross,
  southYarra,
} from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneToFootscray } from "../segments/north-melbourne-to-footscray";
import { southernCrossToNorthMelbourneRegional } from "../segments/southern-cross-to-north-melbourne";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";
import {
  caulfieldToClayton,
  claytonToDandenong,
  dandenongToHallamCurve,
  hallamCurveGippland,
  hallamToPakenham,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "../utils-shared-corridors";

const eastPakenhamToCurve = 25;
const diagonalStraight = 10;
const bairnsdaleStraight = 235;

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
    .straight(richmondToSouthYarra)
    .station(southYarra.point("gippsland"))
    .straight(southYarraToCaulfield)
    .station(caulfield.point("gippsland"))
    .straight(caulfieldToClayton)
    .station(clayton.point("gippsland"))
    .straight(claytonToDandenong)
    .station(dandenong.point("gippsland"))
    .straight(dandenongToHallamCurve)
    .curve(hallamCurveGippland, -45)
    .straight(hallamToPakenham)
    .station(pakenham.point("gippsland"))
    .straight(pakenhamToEastPakenham)
    .station(EAST_PAKENHAM)
    .straight(eastPakenhamToCurve)
    .curve(defaultRadius, -45)
    .straight(diagonalStraight)
    .curve(defaultRadius, -45)
    .straight(bairnsdaleStraight),
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
        new Path()
          .station(northMelbourne.point("regional-seymour"))
          .straight(50),
      ),
    )
    .station(northMelbourne.point("regional-rrl"))
    .add(northMelbourneToFootscray("regional-rrl"))
    .station(footscray.point("regional")),
});
