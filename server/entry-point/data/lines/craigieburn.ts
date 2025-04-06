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
  flindersStreetToSouthernCross: new StationPair(station.FLINDERS_STREET, station.SOUTHERN_CROSS),
  southernCrossToNorthMelbourne: new StationPair(station.SOUTHERN_CROSS, station.NORTH_MELBOURNE),
  flindersStreetToParliament: new StationPair(station.FLINDERS_STREET, station.PARLIAMENT),
  parliamentToMelbourneCentral: new StationPair(station.PARLIAMENT, station.MELBOURNE_CENTRAL),
  melbourneCentralToFlagstaff: new StationPair(station.MELBOURNE_CENTRAL, station.FLAGSTAFF),
  flagstaffToNorthMelbourne: new StationPair(station.FLAGSTAFF, station.NORTH_MELBOURNE),
  northMelbourneToKensington: new StationPair(station.NORTH_MELBOURNE, station.KENSINGTON),
  kensingtonToNewmarket: new StationPair(station.KENSINGTON, station.NEWMARKET),
  newmarketToAscotVale: new StationPair(station.NEWMARKET, station.ASCOT_VALE),
  ascotValeToMooneePonds: new StationPair(station.ASCOT_VALE, station.MOONEE_PONDS),
  mooneePondsToEssendon: new StationPair(station.MOONEE_PONDS, station.ESSENDON),
  essendonToGlenbervie: new StationPair(station.ESSENDON, station.GLENBERVIE),
  glenbervieToStrathmore: new StationPair(station.GLENBERVIE, station.STRATHMORE),
  strathmoreToPascoeVale: new StationPair(station.STRATHMORE, station.PASCOE_VALE),
  pascoeValeToOakPark: new StationPair(station.PASCOE_VALE, station.OAK_PARK),
  oakParkToGlenroy: new StationPair(station.OAK_PARK, station.GLENROY),
  glenroyToJacana: new StationPair(station.GLENROY, station.JACANA),
  jacanaToBroadmeadows: new StationPair(station.JACANA, station.BROADMEADOWS),
  broadmeadowsToCoolaroo: new StationPair(station.BROADMEADOWS, station.COOLAROO),
  coolarooToRoxburghPark: new StationPair(station.COOLAROO, station.ROXBURGH_PARK),
  roxburghParkToCraigieburn: new StationPair(station.ROXBURGH_PARK, station.CRAIGIEBURN),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge("the-city", station.NORTH_MELBOURNE, [
    routeGraph.flindersStreetToSouthernCross,
    routeGraph.southernCrossToNorthMelbourne,
    routeGraph.flindersStreetToParliament,
    routeGraph.parliamentToMelbourneCentral,
    routeGraph.melbourneCentralToFlagstaff,
    routeGraph.flagstaffToNorthMelbourne,
  ]),
  new LineShapeEdge(station.NORTH_MELBOURNE, station.KENSINGTON, [
    routeGraph.northMelbourneToKensington,
  ]),
  new LineShapeEdge(station.KENSINGTON, station.NEWMARKET, [
    routeGraph.kensingtonToNewmarket,
  ]),
  new LineShapeEdge(station.NEWMARKET, station.ASCOT_VALE, [
    routeGraph.newmarketToAscotVale,
  ]),
  new LineShapeEdge(station.ASCOT_VALE, station.MOONEE_PONDS, [
    routeGraph.ascotValeToMooneePonds,
  ]),
  new LineShapeEdge(station.MOONEE_PONDS, station.ESSENDON, [
    routeGraph.mooneePondsToEssendon,
  ]),
  new LineShapeEdge(station.ESSENDON, station.GLENBERVIE, [
    routeGraph.essendonToGlenbervie,
  ]),
  new LineShapeEdge(station.GLENBERVIE, station.STRATHMORE, [
    routeGraph.glenbervieToStrathmore,
  ]),
  new LineShapeEdge(station.STRATHMORE, station.PASCOE_VALE, [
    routeGraph.strathmoreToPascoeVale,
  ]),
  new LineShapeEdge(station.PASCOE_VALE, station.OAK_PARK, [
    routeGraph.pascoeValeToOakPark,
  ]),
  new LineShapeEdge(station.OAK_PARK, station.GLENROY, [
    routeGraph.oakParkToGlenroy,
  ]),
  new LineShapeEdge(station.GLENROY, station.JACANA, [
    routeGraph.glenroyToJacana,
  ]),
  new LineShapeEdge(station.JACANA, station.BROADMEADOWS, [
    routeGraph.jacanaToBroadmeadows,
  ]),
  new LineShapeEdge(station.BROADMEADOWS, station.COOLAROO, [
    routeGraph.broadmeadowsToCoolaroo,
  ]),
  new LineShapeEdge(station.COOLAROO, station.ROXBURGH_PARK, [
    routeGraph.coolarooToRoxburghPark,
  ]),
  new LineShapeEdge(station.ROXBURGH_PARK, station.CRAIGIEBURN, [
    routeGraph.roxburghParkToCraigieburn,
  ]),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.CRAIGIEBURN,
  name: "Craigieburn",
  ptvIds: [3],
  route,
  lineGroup: "suburban",
});
