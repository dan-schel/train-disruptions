import { EAST_PAKENHAM } from "../../../../server/data/station-ids";
import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  bendigo,
  broadmeadows,
  caulfield,
  clayton,
  craigieburn,
  dandenong,
  deerPark,
  flindersStreet,
  footscray,
  northMelbourne,
  pakenham,
  richmond,
  seymour,
  southernCross,
  southYarra,
  sunbury,
  sunshine,
  watergardens,
} from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneToFootscray } from "../segments/north-melbourne-to-footscray";
import { southernCrossToNorthMelbourneRegional } from "../segments/southern-cross-to-north-melbourne";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";
import {
  broadmeadowsStraight,
  caulfieldToClayton,
  claytonToDandenong,
  craigieburnStraight,
  dandenongToHallamCurve,
  hallamCurveGippland,
  hallamToPakenham,
  newmarketCurveSeymour,
  newmarketStraight,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
  sunburyStraight,
  sunshineCurvesBendigo,
  sunshineDiagonals,
  tottenhamStraight,
  watergardensStraight,
} from "../utils-shared-corridors";

const eastPakenhamToCurve = 25;
const diagonalStraight = 10;
const bairnsdaleStraight = 235;

const donnybrookStraight = 25;
const seymourStraight = 195;
const sheppartonStraight = 140;
const avenelStraight = 45;
const alburyStraight = 250;

const kangarooFlatStraight = 135;
const bendigoDiagonal = 25;
const bendigoStraight = 10;
const eaglehawkStraight = 45;
const swanHillStraight = 130;
const echucaStraight = 160;

const deerParkStraight = 60;
const ballaratStraight = 165;
const araratStraight = 50;
const maryboroughStraight = 50;
const wyndhamValeStraight = 135;
const laraStraight = 15;
const warrnamboolStraight = 210;

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
          .straight(newmarketStraight)
          .curve(newmarketCurveSeymour, 45)
          .straight(broadmeadowsStraight)
          .station(broadmeadows.point("seymour"))
          .straight(craigieburnStraight)
          .station(craigieburn.point("seymour"))
          .curve(defaultRadius, 45)
          .straight(donnybrookStraight)
          .curve(defaultRadius, 45)
          .straight(seymourStraight)
          .station(seymour.point("seymour"))
          .split({
            split: new Path().straight(sheppartonStraight),
          })
          .curve(defaultRadius, 45)
          .straight(avenelStraight)
          .curve(defaultRadius, -45)
          .straight(alburyStraight),
      ),
    )
    .station(northMelbourne.point("regional-rrl"))
    .add(northMelbourneToFootscray("regional-rrl"))
    .station(footscray.point("regional"))
    .straight(tottenhamStraight)
    .split({
      split: new Path()
        .curve(sunshineCurvesBendigo, 45)
        .straight(sunshineDiagonals)
        .station(sunshine.point("bendigo"))
        .straight(sunshineDiagonals)
        .curve(sunshineCurvesBendigo, 45)
        .straight(watergardensStraight)
        .station(watergardens.point("bendigo"))
        .straight(sunburyStraight)
        .station(sunbury.point("bendigo"))
        .straight(kangarooFlatStraight)
        .curve(defaultRadius, -45)
        .straight(bendigoDiagonal)
        .curve(defaultRadius, -45)
        .straight(bendigoStraight)
        .station(bendigo.point("bendigo"))
        .split({
          split: new Path().straight(echucaStraight),
        })
        .curve(defaultRadius, -45)
        .straight(eaglehawkStraight)
        .curve(defaultRadius, 45)
        .straight(swanHillStraight),
    })
    .straight(20)
    .station(sunshine.point("deer-park"))
    .straight(deerParkStraight)
    .station(deerPark.point("deer-park"))
    .split({
      split: new Path()
        .straight(wyndhamValeStraight)
        .curve(defaultRadius, -45)
        .straight(laraStraight)
        .curve(defaultRadius, -45)
        .straight(warrnamboolStraight),
    })
    .curve(defaultRadius, 45)
    .straight(ballaratStraight)
    .split({
      split: new Path().straight(araratStraight),
    })
    .curve(defaultRadius, 45)
    .straight(maryboroughStraight),
});
