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
  flindersStreetToJolimont: new StationPair(station.FLINDERS_STREET, station.JOLIMONT),
  flindersStreetToSouthernCross: new StationPair(station.FLINDERS_STREET, station.SOUTHERN_CROSS),
  southernCrossToFlagstaff: new StationPair(station.SOUTHERN_CROSS, station.FLAGSTAFF),
  flagstaffToMelbourneCentral: new StationPair(station.FLAGSTAFF, station.MELBOURNE_CENTRAL),
  melbourneCentralToParliament: new StationPair(station.MELBOURNE_CENTRAL, station.PARLIAMENT),
  parliamentToJolimont: new StationPair(station.PARLIAMENT, station.JOLIMONT),
  jolimontToWestRichmond: new StationPair(station.JOLIMONT, station.WEST_RICHMOND),
  westRichmondToNorthRichmond: new StationPair(station.WEST_RICHMOND, station.NORTH_RICHMOND),
  northRichmondToCollingwood: new StationPair(station.NORTH_RICHMOND, station.COLLINGWOOD),
  collingwoodToVictoriaPark: new StationPair(station.COLLINGWOOD, station.VICTORIA_PARK),
  victoriaParkToCliftonHill: new StationPair(station.VICTORIA_PARK, station.CLIFTON_HILL),
  cliftonHillToWestgarth: new StationPair(station.CLIFTON_HILL, station.WESTGARTH),
  westgarthToDennis: new StationPair(station.WESTGARTH, station.DENNIS),
  dennisToFairfield: new StationPair(station.DENNIS, station.FAIRFIELD),
  fairfieldToAlphington: new StationPair(station.FAIRFIELD, station.ALPHINGTON),
  alphingtonToDarebin: new StationPair(station.ALPHINGTON, station.DAREBIN),
  darebinToIvanhoe: new StationPair(station.DAREBIN, station.IVANHOE),
  ivanhoeToEaglemont: new StationPair(station.IVANHOE, station.EAGLEMONT),
  eaglemontToHeidelberg: new StationPair(station.EAGLEMONT, station.HEIDELBERG),
  heidelbergToRosanna: new StationPair(station.HEIDELBERG, station.ROSANNA),
  rosannaToMacleod: new StationPair(station.ROSANNA, station.MACLEOD),
  macleodToWatsonia: new StationPair(station.MACLEOD, station.WATSONIA),
  watsoniaToGreensborough: new StationPair(station.WATSONIA, station.GREENSBOROUGH),
  greensboroughToMontmorency: new StationPair(station.GREENSBOROUGH, station.MONTMORENCY),
  montmorencyToEltham: new StationPair(station.MONTMORENCY, station.ELTHAM),
  elthamToDiamondCreek: new StationPair(station.ELTHAM, station.DIAMOND_CREEK),
  diamondCreekToWattleGlen: new StationPair(station.DIAMOND_CREEK, station.WATTLE_GLEN),
  wattleGlenToHurstbridge: new StationPair(station.WATTLE_GLEN, station.HURSTBRIDGE),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge("the-city", station.JOLIMONT, [
    routeGraph.flindersStreetToJolimont,
    routeGraph.flindersStreetToSouthernCross,
    routeGraph.southernCrossToFlagstaff,
    routeGraph.flagstaffToMelbourneCentral,
    routeGraph.melbourneCentralToParliament,
    routeGraph.parliamentToJolimont,
  ], []),
  new LineShapeEdge(station.JOLIMONT, station.WEST_RICHMOND, [
    routeGraph.jolimontToWestRichmond,
  ], []),
  new LineShapeEdge(station.WEST_RICHMOND, station.NORTH_RICHMOND, [
    routeGraph.westRichmondToNorthRichmond,
  ], []),
  new LineShapeEdge(station.NORTH_RICHMOND, station.COLLINGWOOD, [
    routeGraph.northRichmondToCollingwood,
  ], []),
  new LineShapeEdge(station.COLLINGWOOD, station.VICTORIA_PARK, [
    routeGraph.collingwoodToVictoriaPark,
  ], []),
  new LineShapeEdge(station.VICTORIA_PARK, station.CLIFTON_HILL, [
    routeGraph.victoriaParkToCliftonHill,
  ], []),
  new LineShapeEdge(station.CLIFTON_HILL, station.WESTGARTH, [
    routeGraph.cliftonHillToWestgarth,
  ], []),
  new LineShapeEdge(station.WESTGARTH, station.DENNIS, [
    routeGraph.westgarthToDennis,
  ], []),
  new LineShapeEdge(station.DENNIS, station.FAIRFIELD, [
    routeGraph.dennisToFairfield,
  ], []),
  new LineShapeEdge(station.FAIRFIELD, station.ALPHINGTON, [
    routeGraph.fairfieldToAlphington,
  ], []),
  new LineShapeEdge(station.ALPHINGTON, station.DAREBIN, [
    routeGraph.alphingtonToDarebin,
  ], []),
  new LineShapeEdge(station.DAREBIN, station.IVANHOE, [
    routeGraph.darebinToIvanhoe,
  ], []),
  new LineShapeEdge(station.IVANHOE, station.EAGLEMONT, [
    routeGraph.ivanhoeToEaglemont,
  ], []),
  new LineShapeEdge(station.EAGLEMONT, station.HEIDELBERG, [
    routeGraph.eaglemontToHeidelberg,
  ], []),
  new LineShapeEdge(station.HEIDELBERG, station.ROSANNA, [
    routeGraph.heidelbergToRosanna,
  ], []),
  new LineShapeEdge(station.ROSANNA, station.MACLEOD, [
    routeGraph.rosannaToMacleod,
  ], []),
  new LineShapeEdge(station.MACLEOD, station.WATSONIA, [
    routeGraph.macleodToWatsonia,
  ], []),
  new LineShapeEdge(station.WATSONIA, station.GREENSBOROUGH, [
    routeGraph.watsoniaToGreensborough,
  ], []),
  new LineShapeEdge(station.GREENSBOROUGH, station.MONTMORENCY, [
    routeGraph.greensboroughToMontmorency,
  ], []),
  new LineShapeEdge(station.MONTMORENCY, station.ELTHAM, [
    routeGraph.montmorencyToEltham,
  ], []),
  new LineShapeEdge(station.ELTHAM, station.DIAMOND_CREEK, [
    routeGraph.elthamToDiamondCreek,
  ], []),
  new LineShapeEdge(station.DIAMOND_CREEK, station.WATTLE_GLEN, [
    routeGraph.diamondCreekToWattleGlen,
  ], []),
  new LineShapeEdge(station.WATTLE_GLEN, station.HURSTBRIDGE, [
    routeGraph.wattleGlenToHurstbridge,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.HURSTBRIDGE,
  name: "Hurstbridge",
  ptvIds: [8],
  route,
  lineGroup: "suburban",
});
