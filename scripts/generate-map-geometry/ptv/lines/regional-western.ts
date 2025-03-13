import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import {
  ballarat,
  bendigo,
  broadmeadows,
  craigieburn,
  deerPark,
  footscray,
  northMelbourne,
  seymour,
  southernCross,
  sunbury,
  sunshine,
  watergardens,
} from "@/scripts/generate-map-geometry/ptv/interchanges";
import { northMelbourneToFootscray } from "@/scripts/generate-map-geometry/ptv/segments/north-melbourne-to-footscray";
import { southernCrossToNorthMelbourneRegional } from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-north-melbourne";
import {
  defaultRadius,
  standardDiagonal,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  broadmeadowsStraight,
  craigieburnStraight,
  deerParkStraight,
  newmarketCurveSeymour,
  newmarketStraight,
  sunburyStraight,
  sunshineCurvesBendigo,
  sunshineExitDiagonal,
  sunshineJunctionDiagonal,
  sunshineJunctionStraight,
  tottenhamStraight,
  watergardensStraight,
} from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";

const seymourStraight = flexi(50, 100);
const sheppartonStraight = flexi(75, 150);
const avenelStraight = flexi(20, 40);
const alburyStraight = flexi(75, 150);

const kangarooFlatStraight = flexi(30, 60);
const bendigoStraight = flexi(10);
const eaglehawkStraight = flexi(20, 30);
const swanHillStraight = flexi(30, 80);
const echucaStraight = flexi(50, 100);

const ballaratStraight = flexi(40, 80);
const araratStraight = flexi(30, 60);
const maryboroughStraight = flexi(25, 50);
const wyndhamValeStraight = flexi(50, 100);
const warrnamboolStraight = flexi(75, 150);

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
          .straight(standardDiagonal)
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
        .straight(standardDiagonal)
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
        .straight(standardDiagonal)
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
