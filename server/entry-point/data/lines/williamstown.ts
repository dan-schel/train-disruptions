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
  northMelbourneToSouthKensington: new StationPair(station.NORTH_MELBOURNE, station.SOUTH_KENSINGTON),
  southKensingtonToFootscray: new StationPair(station.SOUTH_KENSINGTON, station.FOOTSCRAY),
  footscrayToSeddon: new StationPair(station.FOOTSCRAY, station.SEDDON),
  seddonToYarraville: new StationPair(station.SEDDON, station.YARRAVILLE),
  yarravilleToSpotswood: new StationPair(station.YARRAVILLE, station.SPOTSWOOD),
  spotswoodToNewport: new StationPair(station.SPOTSWOOD, station.NEWPORT),
  newportToNorthWilliamstown: new StationPair(station.NEWPORT, station.NORTH_WILLIAMSTOWN),
  northWilliamstownToWilliamstownBeach: new StationPair(station.NORTH_WILLIAMSTOWN, station.WILLIAMSTOWN_BEACH),
  williamstownBeachToWilliamstown: new StationPair(station.WILLIAMSTOWN_BEACH, station.WILLIAMSTOWN),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.FLINDERS_STREET, station.SOUTHERN_CROSS, [
    routeGraph.flindersStreetToSouthernCross,
  ], []),
  new LineShapeEdge(station.SOUTHERN_CROSS, station.NORTH_MELBOURNE, [
    routeGraph.southernCrossToNorthMelbourne,
  ], []),
  new LineShapeEdge(station.NORTH_MELBOURNE, station.SOUTH_KENSINGTON, [
    routeGraph.northMelbourneToSouthKensington,
  ], []),
  new LineShapeEdge(station.SOUTH_KENSINGTON, station.FOOTSCRAY, [
    routeGraph.southKensingtonToFootscray,
  ], []),
  new LineShapeEdge(station.FOOTSCRAY, station.SEDDON, [
    routeGraph.footscrayToSeddon,
  ], []),
  new LineShapeEdge(station.SEDDON, station.YARRAVILLE, [
    routeGraph.seddonToYarraville,
  ], []),
  new LineShapeEdge(station.YARRAVILLE, station.SPOTSWOOD, [
    routeGraph.yarravilleToSpotswood,
  ], []),
  new LineShapeEdge(station.SPOTSWOOD, station.NEWPORT, [
    routeGraph.spotswoodToNewport,
  ], []),
  new LineShapeEdge(station.NEWPORT, station.NORTH_WILLIAMSTOWN, [
    routeGraph.newportToNorthWilliamstown,
  ], []),
  new LineShapeEdge(station.NORTH_WILLIAMSTOWN, station.WILLIAMSTOWN_BEACH, [
    routeGraph.northWilliamstownToWilliamstownBeach,
  ], []),
  new LineShapeEdge(station.WILLIAMSTOWN_BEACH, station.WILLIAMSTOWN, [
    routeGraph.williamstownBeachToWilliamstown,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.FLINDERS_STREET, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.WILLIAMSTOWN,
  name: "Williamstown",
  ptvIds: [17],
  route,
  lineGroup: "suburban",
});
