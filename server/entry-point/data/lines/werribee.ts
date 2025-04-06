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
  newportToSeaholme: new StationPair(station.NEWPORT, station.SEAHOLME),
  seaholmeToAltona: new StationPair(station.SEAHOLME, station.ALTONA),
  altonaToWestona: new StationPair(station.ALTONA, station.WESTONA),
  westonaToLaverton: new StationPair(station.WESTONA, station.LAVERTON),
  newportToLaverton: new StationPair(station.NEWPORT, station.LAVERTON),
  lavertonToAircraft: new StationPair(station.LAVERTON, station.AIRCRAFT),
  aircraftToWilliamsLanding: new StationPair(station.AIRCRAFT, station.WILLIAMS_LANDING),
  williamsLandingToHoppersCrossing: new StationPair(station.WILLIAMS_LANDING, station.HOPPERS_CROSSING),
  hoppersCrossingToWerribee: new StationPair(station.HOPPERS_CROSSING, station.WERRIBEE),
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
  new LineShapeEdge(station.NEWPORT, station.LAVERTON, [
    routeGraph.newportToSeaholme,
    routeGraph.seaholmeToAltona,
    routeGraph.altonaToWestona,
    routeGraph.westonaToLaverton,
    routeGraph.newportToLaverton,
  ], []),
  new LineShapeEdge(station.LAVERTON, station.AIRCRAFT, [
    routeGraph.lavertonToAircraft,
  ], []),
  new LineShapeEdge(station.AIRCRAFT, station.WILLIAMS_LANDING, [
    routeGraph.aircraftToWilliamsLanding,
  ], []),
  new LineShapeEdge(station.WILLIAMS_LANDING, station.HOPPERS_CROSSING, [
    routeGraph.williamsLandingToHoppersCrossing,
  ], []),
  new LineShapeEdge(station.HOPPERS_CROSSING, station.WERRIBEE, [
    routeGraph.hoppersCrossingToWerribee,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.FLINDERS_STREET, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.WERRIBEE,
  name: "Werribee",
  ptvIds: [16],
  route,
  lineGroup: "suburban",
});
