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
  northMelbourneToMacaulay: new StationPair(station.NORTH_MELBOURNE, station.MACAULAY),
  macaulayToFlemingtonBridge: new StationPair(station.MACAULAY, station.FLEMINGTON_BRIDGE),
  flemingtonBridgeToRoyalPark: new StationPair(station.FLEMINGTON_BRIDGE, station.ROYAL_PARK),
  royalParkToJewell: new StationPair(station.ROYAL_PARK, station.JEWELL),
  jewellToBrunswick: new StationPair(station.JEWELL, station.BRUNSWICK),
  brunswickToAnstey: new StationPair(station.BRUNSWICK, station.ANSTEY),
  ansteyToMoreland: new StationPair(station.ANSTEY, station.MORELAND),
  morelandToCoburg: new StationPair(station.MORELAND, station.COBURG),
  coburgToBatman: new StationPair(station.COBURG, station.BATMAN),
  batmanToMerlynston: new StationPair(station.BATMAN, station.MERLYNSTON),
  merlynstonToFawkner: new StationPair(station.MERLYNSTON, station.FAWKNER),
  fawknerToGowrie: new StationPair(station.FAWKNER, station.GOWRIE),
  gowrieToUpfield: new StationPair(station.GOWRIE, station.UPFIELD),
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
  ], []),
  new LineShapeEdge(station.NORTH_MELBOURNE, station.MACAULAY, [
    routeGraph.northMelbourneToMacaulay,
  ], []),
  new LineShapeEdge(station.MACAULAY, station.FLEMINGTON_BRIDGE, [
    routeGraph.macaulayToFlemingtonBridge,
  ], []),
  new LineShapeEdge(station.FLEMINGTON_BRIDGE, station.ROYAL_PARK, [
    routeGraph.flemingtonBridgeToRoyalPark,
  ], []),
  new LineShapeEdge(station.ROYAL_PARK, station.JEWELL, [
    routeGraph.royalParkToJewell,
  ], []),
  new LineShapeEdge(station.JEWELL, station.BRUNSWICK, [
    routeGraph.jewellToBrunswick,
  ], []),
  new LineShapeEdge(station.BRUNSWICK, station.ANSTEY, [
    routeGraph.brunswickToAnstey,
  ], []),
  new LineShapeEdge(station.ANSTEY, station.MORELAND, [
    routeGraph.ansteyToMoreland,
  ], []),
  new LineShapeEdge(station.MORELAND, station.COBURG, [
    routeGraph.morelandToCoburg,
  ], []),
  new LineShapeEdge(station.COBURG, station.BATMAN, [
    routeGraph.coburgToBatman,
  ], []),
  new LineShapeEdge(station.BATMAN, station.MERLYNSTON, [
    routeGraph.batmanToMerlynston,
  ], []),
  new LineShapeEdge(station.MERLYNSTON, station.FAWKNER, [
    routeGraph.merlynstonToFawkner,
  ], []),
  new LineShapeEdge(station.FAWKNER, station.GOWRIE, [
    routeGraph.fawknerToGowrie,
  ], []),
  new LineShapeEdge(station.GOWRIE, station.UPFIELD, [
    routeGraph.gowrieToUpfield,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.UPFIELD,
  name: "Upfield",
  ptvIds: [15],
  route,
  lineGroup: "suburban",
});
