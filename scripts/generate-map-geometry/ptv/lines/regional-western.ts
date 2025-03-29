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
    .nodes([node.SOUTHERN_CROSS])
    .add(
      southernCrossToNorthMelbourneRegional(
        new PathBlueprint()
          .nodes([node.NORTH_MELBOURNE_SEYMOUR])
          .straight(newmarketStraight)
          .curve(newmarketCurveSeymour, 45)
          .straight(broadmeadowsStraight)
          .nodes([
            node.KENSINGTON,
            node.NEWMARKET,
            node.ASCOT_VALE,
            node.MOONEE_PONDS,
            node.ESSENDON,
            node.GLENBERVIE,
            node.STRATHMORE,
            node.PASCOE_VALE,
            node.OAK_PARK,
            node.GLENROY,
            node.JACANA,
            node.BROADMEADOWS,
          ])
          .straight(craigieburnStraight)
          .nodes([node.COOLAROO, node.ROXBURGH_PARK, node.CRAIGIEBURN])
          .curve(defaultRadius, 45)
          .straight(standardDiagonal)
          .curve(defaultRadius, 45)
          .straight(seymourStraight)
          .nodes([
            node.DONNYBROOK,
            node.WALLAN,
            node.HEATHCOTE_JUNCTION,
            node.WANDONG,
            node.KILMORE_EAST,
            node.BROADFORD,
            node.TALLAROOK,
            node.SEYMOUR,
          ])
          .split({
            split: new PathBlueprint()
              .straight(sheppartonStraight)
              .nodes([
                node.NAGAMBIE,
                node.MURCHISON_EAST,
                node.MOOROOPNA,
                node.SHEPPARTON,
              ])
              .terminus(),
          })
          .curve(defaultRadius, 45)
          .straight(avenelStraight)
          .curve(defaultRadius, -45)
          .straight(alburyStraight)
          .nodes([
            node.AVENEL,
            node.EUROA,
            node.VIOLET_TOWN,
            node.BENALLA,
            node.WANGARATTA,
            node.SPRINGHURST,
            node.CHILTERN,
            node.WODONGA,
            node.ALBURY,
          ])
          .terminus(),
      ),
    )
    .nodes([node.NORTH_MELBOURNE_RRL])
    .add(northMelbourneToFootscray("regional-rrl"))
    .nodes([node.SOUTH_KENSINGTON, node.FOOTSCRAY])
    .straight(tottenhamStraight)
    .nodes([node.MIDDLE_FOOTSCRAY, node.WEST_FOOTSCRAY, node.TOTTENHAM])
    .split({
      split: new PathBlueprint()
        .curve(sunshineCurvesBendigo, 45)
        .straight(sunshineJunctionDiagonal)
        .nodes([node.SUNSHINE_BENDIGO])
        .straight(sunshineExitDiagonal)
        .curve(sunshineCurvesBendigo, 45)
        .straight(watergardensStraight)
        .nodes([
          node.ALBION,
          node.GINIFER,
          node.ST_ALBANS,
          node.KEILOR_PLAINS,
          node.WATERGARDENS,
        ])
        .straight(sunburyStraight)
        .nodes([node.DIGGERS_REST, node.SUNBURY])
        .straight(kangarooFlatStraight)
        .curve(defaultRadius, -45)
        .straight(standardDiagonal)
        .curve(defaultRadius, -45)
        .straight(bendigoStraight)
        .nodes([
          node.CLARKEFIELD,
          node.RIDDELLS_CREEK,
          node.GISBORNE,
          node.MACEDON,
          node.WOODEND,
          node.KYNETON,
          node.MALMSBURY,
          node.CASTLEMAINE,
          node.KANGAROO_FLAT,
          node.BENDIGO,
        ])
        .split({
          split: new PathBlueprint()
            .straight(echucaStraight)
            .nodes([
              node.EPSOM,
              node.HUNTLY,
              node.GOORNONG,
              node.ELMORE,
              node.ROCHESTER,
              node.ECHUCA,
            ])
            .terminus(),
        })
        .curve(defaultRadius, -45)
        .straight(eaglehawkStraight)
        .curve(defaultRadius, 45)
        .straight(swanHillStraight)
        .nodes([
          node.EAGLEHAWK,
          node.RAYWOOD,
          node.DINGEE,
          node.PYRAMID,
          node.KERANG,
          node.SWAN_HILL,
        ])
        .terminus(),
    })
    .straight(sunshineJunctionStraight)
    .nodes([node.SUNSHINE_DEER_PARK])
    .straight(deerParkStraight)
    .nodes([node.ARDEER, node.DEER_PARK])
    .split({
      split: new PathBlueprint()
        .straight(wyndhamValeStraight)
        .curve(defaultRadius, -45)
        .straight(standardDiagonal)
        .curve(defaultRadius, -45)
        .straight(warrnamboolStraight)
        .nodes([
          node.TARNEIT,
          node.WYNDHAM_VALE,
          node.LITTLE_RIVER,
          node.LARA,
          node.CORIO,
          node.NORTH_SHORE,
          node.NORTH_GEELONG,
          node.GEELONG,
          node.SOUTH_GEELONG,
          node.MARSHALL,
          node.WAURN_PONDS,
          node.WINCHELSEA,
          node.BIRREGURRA,
          node.COLAC,
          node.CAMPERDOWN,
          node.TERANG,
          node.SHERWOOD_PARK,
          node.WARRNAMBOOL,
        ])
        .terminus(),
    })
    .curve(defaultRadius, 45)
    .straight(ballaratStraight)
    .nodes([
      node.CAROLINE_SPRINGS,
      node.ROCKBANK,
      node.COBBLEBANK,
      node.MELTON,
      node.BACCHUS_MARSH,
      node.BALLAN,
      node.BALLARAT,
    ])
    .split({
      split: new PathBlueprint()
        .straight(araratStraight)
        .nodes([node.WENDOUREE, node.BEAUFORT, node.ARARAT])
        .terminus(),
    })
    .curve(defaultRadius, 45)
    .straight(maryboroughStraight)
    .nodes([node.CRESWICK, node.CLUNES, node.TALBOT, node.MARYBOROUGH])
    .terminus(),
});
