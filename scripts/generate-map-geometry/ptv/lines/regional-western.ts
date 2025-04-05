import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
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
import { REGIONAL_WESTERN as node } from "@/shared/map-node-ids";

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
    .node(node.SOUTHERN_CROSS)
    .add(
      southernCrossToNorthMelbourneRegional(
        new PathBlueprint()
          .node(node.NORTH_MELBOURNE_SEYMOUR)
          .straight(newmarketStraight)
          .curve(newmarketCurveSeymour, 45)
          .straight(broadmeadowsStraight)
          .node(node.BROADMEADOWS)
          .straight(craigieburnStraight)
          .node(node.CRAIGIEBURN)
          .curve(defaultRadius, 45)
          .straight(standardDiagonal)
          .curve(defaultRadius, 45)
          .straight(seymourStraight)
          .node(node.SEYMOUR)
          .split({
            split: new PathBlueprint()
              .straight(sheppartonStraight)
              .node(node.SHEPPARTON),
          })
          .curve(defaultRadius, 45)
          .straight(avenelStraight)
          .curve(defaultRadius, -45)
          .straight(alburyStraight)
          .node(node.ALBURY),
      ),
    )
    .node(node.NORTH_MELBOURNE_RRL)
    .add(northMelbourneToFootscray("regional-rrl"))
    .node(node.FOOTSCRAY)
    .straight(tottenhamStraight)
    .node(node.SUNSHINE_JUNCTION)
    .split({
      split: new PathBlueprint()
        .curve(sunshineCurvesBendigo, 45)
        .straight(sunshineJunctionDiagonal)
        .node(node.SUNSHINE_BENDIGO)
        .straight(sunshineExitDiagonal)
        .curve(sunshineCurvesBendigo, 45)
        .straight(watergardensStraight)
        .node(node.WATERGARDENS)
        .straight(sunburyStraight)
        .node(node.SUNBURY)
        .straight(kangarooFlatStraight)
        .curve(defaultRadius, -45)
        .straight(standardDiagonal)
        .curve(defaultRadius, -45)
        .straight(bendigoStraight)
        .node(node.BENDIGO)
        .split({
          split: new PathBlueprint().straight(echucaStraight).node(node.ECHUCA),
        })
        .curve(defaultRadius, -45)
        .straight(eaglehawkStraight)
        .curve(defaultRadius, 45)
        .straight(swanHillStraight)
        .node(node.SWAN_HILL),
    })
    .straight(sunshineJunctionStraight)
    .node(node.SUNSHINE_DEER_PARK)
    .straight(deerParkStraight)
    .node(node.DEER_PARK)
    .split({
      split: new PathBlueprint()
        .straight(wyndhamValeStraight)
        .curve(defaultRadius, -45)
        .straight(standardDiagonal)
        .curve(defaultRadius, -45)
        .straight(warrnamboolStraight)
        .node(node.WARRNAMBOOL),
    })
    .curve(defaultRadius, 45)
    .straight(ballaratStraight)
    .node(node.BALLARAT)
    .split({
      split: new PathBlueprint().straight(araratStraight).node(node.ARARAT),
    })
    .curve(defaultRadius, 45)
    .straight(maryboroughStraight)
    .node(node.MARYBOROUGH),
});
