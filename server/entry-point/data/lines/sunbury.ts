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
  northMelbourneToFootscray: new StationPair(station.NORTH_MELBOURNE, station.FOOTSCRAY),
  footscrayToMiddleFootscray: new StationPair(station.FOOTSCRAY, station.MIDDLE_FOOTSCRAY),
  middleFootscrayToWestFootscray: new StationPair(station.MIDDLE_FOOTSCRAY, station.WEST_FOOTSCRAY),
  westFootscrayToTottenham: new StationPair(station.WEST_FOOTSCRAY, station.TOTTENHAM),
  tottenhamToSunshine: new StationPair(station.TOTTENHAM, station.SUNSHINE),
  sunshineToAlbion: new StationPair(station.SUNSHINE, station.ALBION),
  albionToGinifer: new StationPair(station.ALBION, station.GINIFER),
  giniferToStAlbans: new StationPair(station.GINIFER, station.ST_ALBANS),
  stAlbansToKeilorPlains: new StationPair(station.ST_ALBANS, station.KEILOR_PLAINS),
  keilorPlainsToWatergardens: new StationPair(station.KEILOR_PLAINS, station.WATERGARDENS),
  watergardensToDiggersRest: new StationPair(station.WATERGARDENS, station.DIGGERS_REST),
  diggersRestToSunbury: new StationPair(station.DIGGERS_REST, station.SUNBURY),
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
  new LineShapeEdge(station.NORTH_MELBOURNE, station.FOOTSCRAY, [
    routeGraph.northMelbourneToFootscray,
  ], []),
  new LineShapeEdge(station.FOOTSCRAY, station.MIDDLE_FOOTSCRAY, [
    routeGraph.footscrayToMiddleFootscray,
  ], []),
  new LineShapeEdge(station.MIDDLE_FOOTSCRAY, station.WEST_FOOTSCRAY, [
    routeGraph.middleFootscrayToWestFootscray,
  ], []),
  new LineShapeEdge(station.WEST_FOOTSCRAY, station.TOTTENHAM, [
    routeGraph.westFootscrayToTottenham,
  ], []),
  new LineShapeEdge(station.TOTTENHAM, station.SUNSHINE, [
    routeGraph.tottenhamToSunshine,
  ], []),
  new LineShapeEdge(station.SUNSHINE, station.ALBION, [
    routeGraph.sunshineToAlbion,
  ], []),
  new LineShapeEdge(station.ALBION, station.GINIFER, [
    routeGraph.albionToGinifer,
  ], []),
  new LineShapeEdge(station.GINIFER, station.ST_ALBANS, [
    routeGraph.giniferToStAlbans,
  ], []),
  new LineShapeEdge(station.ST_ALBANS, station.KEILOR_PLAINS, [
    routeGraph.stAlbansToKeilorPlains,
  ], []),
  new LineShapeEdge(station.KEILOR_PLAINS, station.WATERGARDENS, [
    routeGraph.keilorPlainsToWatergardens,
  ], []),
  new LineShapeEdge(station.WATERGARDENS, station.DIGGERS_REST, [
    routeGraph.watergardensToDiggersRest,
  ], []),
  new LineShapeEdge(station.DIGGERS_REST, station.SUNBURY, [
    routeGraph.diggersRestToSunbury,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.SUNBURY,
  name: "Sunbury",
  ptvIds: [14],
  route,
  lineGroup: "suburban",
});
