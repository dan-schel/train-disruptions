import * as id from "@/shared/line-ids";
import * as station from "@/shared/station-ids";
import { Line } from "@/server/data/line/line";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import {
  LineShape,
  LineShapeEdge,
} from "@/server/data/line/line-routes/line-shape";
import { LineRoute } from "@/server/data/line/line-routes/line-route";

// prettier-ignore
const routeGraph = {
  southernCrossToDonnybrook: new StationPair(station.SOUTHERN_CROSS, station.DONNYBROOK),
  northMelbourneToDonnybrook: new StationPair(station.NORTH_MELBOURNE, station.DONNYBROOK),
  broadmeadowsToDonnybrook: new StationPair(station.BROADMEADOWS, station.DONNYBROOK),
  craigieburnToDonnybrook: new StationPair(station.CRAIGIEBURN, station.DONNYBROOK),
  donnybrookToWallan: new StationPair(station.DONNYBROOK, station.WALLAN),
  wallanToHeathcoteJunction: new StationPair(station.WALLAN, station.HEATHCOTE_JUNCTION),
  heathcoteJunctionToWandong: new StationPair(station.HEATHCOTE_JUNCTION, station.WANDONG),
  wandongToKilmoreEast: new StationPair(station.WANDONG, station.KILMORE_EAST),
  kilmoreEastToBroadford: new StationPair(station.KILMORE_EAST, station.BROADFORD),
  broadfordToTallarook: new StationPair(station.BROADFORD, station.TALLAROOK),
  tallarookToSeymour: new StationPair(station.TALLAROOK, station.SEYMOUR),
  seymourToAvenel: new StationPair(station.SEYMOUR, station.AVENEL),
  avenelToEuroa: new StationPair(station.AVENEL, station.EUROA),
  euroaToVioletTown: new StationPair(station.EUROA, station.VIOLET_TOWN),
  violetTownToBenalla: new StationPair(station.VIOLET_TOWN, station.BENALLA),
  benallaToWangaratta: new StationPair(station.BENALLA, station.WANGARATTA),
  wangarattaToSpringhurst: new StationPair(station.WANGARATTA, station.SPRINGHURST),
  springhurstToChiltern: new StationPair(station.SPRINGHURST, station.CHILTERN),
  chilternToWodonga: new StationPair(station.CHILTERN, station.WODONGA),
  wodongaToAlbury: new StationPair(station.WODONGA, station.ALBURY),
  seymourToNagambie: new StationPair(station.SEYMOUR, station.NAGAMBIE),
  nagambieToMurchisonEast: new StationPair(station.NAGAMBIE, station.MURCHISON_EAST),
  murchisonEastToMooroopna: new StationPair(station.MURCHISON_EAST, station.MOOROOPNA),
  mooroopnaToShepparton: new StationPair(station.MOOROOPNA, station.SHEPPARTON),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.SOUTHERN_CROSS, station.NORTH_MELBOURNE, [
    routeGraph.southernCrossToDonnybrook,
  ]),
  new LineShapeEdge(station.NORTH_MELBOURNE, station.BROADMEADOWS, [
    routeGraph.southernCrossToDonnybrook,
    routeGraph.northMelbourneToDonnybrook,
  ]),
  new LineShapeEdge(station.BROADMEADOWS, station.CRAIGIEBURN, [
    routeGraph.southernCrossToDonnybrook,
    routeGraph.northMelbourneToDonnybrook,
    routeGraph.broadmeadowsToDonnybrook,
  ]),
  new LineShapeEdge(station.CRAIGIEBURN, station.DONNYBROOK, [
    routeGraph.southernCrossToDonnybrook,
    routeGraph.northMelbourneToDonnybrook,
    routeGraph.broadmeadowsToDonnybrook,
    routeGraph.craigieburnToDonnybrook,
  ]),
  new LineShapeEdge(station.DONNYBROOK, station.WALLAN, [
    routeGraph.donnybrookToWallan,
  ]),
  new LineShapeEdge(station.WALLAN, station.HEATHCOTE_JUNCTION, [
    routeGraph.wallanToHeathcoteJunction,
  ]),
  new LineShapeEdge(station.HEATHCOTE_JUNCTION, station.WANDONG, [
    routeGraph.heathcoteJunctionToWandong,
  ]),
  new LineShapeEdge(station.WANDONG, station.KILMORE_EAST, [
    routeGraph.wandongToKilmoreEast,
  ]),
  new LineShapeEdge(station.KILMORE_EAST, station.BROADFORD, [
    routeGraph.kilmoreEastToBroadford,
  ]),
  new LineShapeEdge(station.BROADFORD, station.TALLAROOK, [
    routeGraph.broadfordToTallarook,
  ]),
  new LineShapeEdge(station.TALLAROOK, station.SEYMOUR, [
    routeGraph.tallarookToSeymour,
  ]),
  new LineShapeEdge(station.SEYMOUR, station.AVENEL, [
    routeGraph.seymourToAvenel,
  ]),
  new LineShapeEdge(station.AVENEL, station.EUROA, [
    routeGraph.avenelToEuroa,
  ]),
  new LineShapeEdge(station.EUROA, station.VIOLET_TOWN, [
    routeGraph.euroaToVioletTown,
  ]),
  new LineShapeEdge(station.VIOLET_TOWN, station.BENALLA, [
    routeGraph.violetTownToBenalla,
  ]),
  new LineShapeEdge(station.BENALLA, station.WANGARATTA, [
    routeGraph.benallaToWangaratta,
  ]),
  new LineShapeEdge(station.WANGARATTA, station.SPRINGHURST, [
    routeGraph.wangarattaToSpringhurst,
  ]),
  new LineShapeEdge(station.SPRINGHURST, station.CHILTERN, [
    routeGraph.springhurstToChiltern,
  ]),
  new LineShapeEdge(station.CHILTERN, station.WODONGA, [
    routeGraph.chilternToWodonga,
  ]),
  new LineShapeEdge(station.WODONGA, station.ALBURY, [
    routeGraph.wodongaToAlbury,
  ]),
  new LineShapeEdge(station.SEYMOUR, station.NAGAMBIE, [
    routeGraph.seymourToNagambie,
  ]),
  new LineShapeEdge(station.NAGAMBIE, station.MURCHISON_EAST, [
    routeGraph.nagambieToMurchisonEast,
  ]),
  new LineShapeEdge(station.MURCHISON_EAST, station.MOOROOPNA, [
    routeGraph.murchisonEastToMooroopna,
  ]),
  new LineShapeEdge(station.MOOROOPNA, station.SHEPPARTON, [
    routeGraph.mooroopnaToShepparton,
  ]),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.SOUTHERN_CROSS, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.SEYMOUR,
  name: "Seymour",
  ptvIds: [1706, 1710, 1908],
  route,
  lineGroup: "regional",
});
