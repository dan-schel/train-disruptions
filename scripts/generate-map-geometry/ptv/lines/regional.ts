import { EAST_PAKENHAM } from "../../../../server/data/station-ids";
import { flexi } from "../../lib/dimensions/flexi-length";
import { LineBlueprint } from "../../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import {
  ballarat,
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
import { defaultRadius, standardDiagonal } from "../utils";
import * as loop from "../utils-city-loop";
import {
  broadmeadowsStraight,
  caulfieldToClayton,
  claytonToDandenong,
  craigieburnStraight,
  dandenongToHallamCurve,
  deerParkStraight,
  hallamCurveGippland,
  hallamToPakenham,
  newmarketCurveSeymour,
  newmarketStraight,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
  sunburyStraight,
  sunshineCurvesBendigo,
  sunshineExitDiagonal,
  sunshineJunctionDiagonal,
  sunshineJunctionStraight,
  tottenhamStraight,
  watergardensStraight,
} from "../utils-shared-corridors";

const eastPakenhamToCurve = flexi(10, 25);
const diagonalStraight = standardDiagonal;
const bairnsdaleStraight = flexi(60, 120);

const donnybrookStraight = standardDiagonal;
const seymourStraight = flexi(50, 100);
const sheppartonStraight = flexi(75, 150);
const avenelStraight = flexi(20, 40);
const alburyStraight = flexi(75, 150);

const kangarooFlatStraight = flexi(30, 60);
const bendigoDiagonal = standardDiagonal;
const bendigoStraight = flexi(10);
const eaglehawkStraight = flexi(20, 30);
const swanHillStraight = flexi(30, 80);
const echucaStraight = flexi(50, 100);

const ballaratStraight = flexi(40, 80);
const araratStraight = flexi(30, 60);
const maryboroughStraight = flexi(25, 50);
const wyndhamValeStraight = flexi(50, 100);
const laraStraight = standardDiagonal;
const warrnamboolStraight = flexi(75, 150);

/**
 * The Gippsland line, which is the only regional line (colored purple on the
 * map) to depart Southern Cross towards Flinders Street and ultimately heads
 * east.
 */
export const regionalEastern = new LineBlueprint({
  origin: loop.pos.southernCross(loop.line.crossCity),
  angle: 45,
  color: "purple",

  path: new PathBlueprint()
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
    .straight(bairnsdaleStraight)
    .terminus(),
});

/**
 * The Ballarat, Bendigo, Geelong, and Seymour lines, which are regional lines
 * (colored purple on the map) that depart Southern Cross toward North
 * Melbourne/Footscray.
 */
export const regionalWestern = new LineBlueprint({
  origin: loop.pos.southernCross(loop.line.dandenong),
  angle: 225,
  color: "purple",

  path: new PathBlueprint()
    .station(southernCross.point("regional-west"))
    .add(
      southernCrossToNorthMelbourneRegional(
        new PathBlueprint()
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
            split: new PathBlueprint().straight(sheppartonStraight).terminus(),
          })
          .curve(defaultRadius, 45)
          .straight(avenelStraight)
          .curve(defaultRadius, -45)
          .straight(alburyStraight)
          .terminus(),
      ),
    )
    .station(northMelbourne.point("regional-rrl"))
    .add(northMelbourneToFootscray("regional-rrl"))
    .station(footscray.point("regional"))
    .straight(tottenhamStraight)
    .split({
      split: new PathBlueprint()
        .curve(sunshineCurvesBendigo, 45)
        .straight(sunshineJunctionDiagonal)
        .station(sunshine.point("bendigo"))
        .straight(sunshineExitDiagonal)
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
          split: new PathBlueprint().straight(echucaStraight).terminus(),
        })
        .curve(defaultRadius, -45)
        .straight(eaglehawkStraight)
        .curve(defaultRadius, 45)
        .straight(swanHillStraight)
        .terminus(),
    })
    .straight(sunshineJunctionStraight)
    .station(sunshine.point("deer-park"))
    .straight(deerParkStraight)
    .station(deerPark.point("deer-park"))
    .split({
      split: new PathBlueprint()
        .straight(wyndhamValeStraight)
        .curve(defaultRadius, -45)
        .straight(laraStraight)
        .curve(defaultRadius, -45)
        .straight(warrnamboolStraight)
        .terminus(),
    })
    .curve(defaultRadius, 45)
    .straight(ballaratStraight)
    .station(ballarat.point("ballarat"))
    .split({
      split: new PathBlueprint().straight(araratStraight).terminus(),
    })
    .curve(defaultRadius, 45)
    .straight(maryboroughStraight)
    .terminus(),
});
