import * as id from "@/shared/line-ids";
import * as station from "@/shared/station-ids";
import * as map from "@/shared/map-node-ids";
import { Line } from "@/server/data/line/line";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import {
  LineShape,
  LineShapeEdge,
} from "@/server/data/line/line-routes/line-shape";
import { LineRoute } from "@/server/data/line/line-routes/line-route";
import { MapSegment } from "@/server/data/map-segment";

// prettier-ignore
const routeGraph = {
  southernCrossToDeerPark: new StationPair(station.SOUTHERN_CROSS, station.DEER_PARK),
  footscrayToDeerPark: new StationPair(station.FOOTSCRAY, station.DEER_PARK),
  sunshineToDeerPark: new StationPair(station.SUNSHINE, station.DEER_PARK),
  deerParkToTarneit: new StationPair(station.DEER_PARK, station.TARNEIT),
  tarneitToWyndhamVale: new StationPair(station.TARNEIT, station.WYNDHAM_VALE),
  wyndhamValeToLittleRiver: new StationPair(station.WYNDHAM_VALE, station.LITTLE_RIVER),
  littleRiverToLara: new StationPair(station.LITTLE_RIVER, station.LARA),
  laraToCorio: new StationPair(station.LARA, station.CORIO),
  corioToNorthShore: new StationPair(station.CORIO, station.NORTH_SHORE),
  northShoreToNorthGeelong: new StationPair(station.NORTH_SHORE, station.NORTH_GEELONG),
  northGeelongToGeelong: new StationPair(station.NORTH_GEELONG, station.GEELONG),
  geelongToSouthGeelong: new StationPair(station.GEELONG, station.SOUTH_GEELONG),
  southGeelongToMarshall: new StationPair(station.SOUTH_GEELONG, station.MARSHALL),
  marshallToWaurnPonds: new StationPair(station.MARSHALL, station.WAURN_PONDS),
  waurnPondsToWinchelsea: new StationPair(station.WAURN_PONDS, station.WINCHELSEA),
  winchelseaToBirregurra: new StationPair(station.WINCHELSEA, station.BIRREGURRA),
  birregurraToColac: new StationPair(station.BIRREGURRA, station.COLAC),
  colacToCamperdown: new StationPair(station.COLAC, station.CAMPERDOWN),
  camperdownToTerang: new StationPair(station.CAMPERDOWN, station.TERANG),
  terangToSherwoodPark: new StationPair(station.TERANG, station.SHERWOOD_PARK),
  sherwoodParkToWarrnambool: new StationPair(station.SHERWOOD_PARK, station.WARRNAMBOOL),
};

// prettier-ignore
const mapSegment = {
  southernCrossToNorthMelbourneJunction: MapSegment.full(map.REGIONAL_WESTERN.SOUTHERN_CROSS, map.REGIONAL_WESTERN.NORTH_MELBOURNE_JUNCTION),
  northMelbourneJunctionToNorthMelbourne: MapSegment.full(map.REGIONAL_WESTERN.NORTH_MELBOURNE_JUNCTION, map.REGIONAL_WESTERN.NORTH_MELBOURNE_RRL),
  northMelbourneToFootscray: MapSegment.full(map.REGIONAL_WESTERN.NORTH_MELBOURNE_RRL, map.REGIONAL_WESTERN.FOOTSCRAY),
  footscrayToSunshineJunction: MapSegment.full(map.REGIONAL_WESTERN.FOOTSCRAY, map.REGIONAL_WESTERN.SUNSHINE_JUNCTION),
  sunshineJunctionToSunshine: MapSegment.full(map.REGIONAL_WESTERN.SUNSHINE_JUNCTION, map.REGIONAL_WESTERN.SUNSHINE_DEER_PARK),
  sunshineToDeerPark: MapSegment.full(map.REGIONAL_WESTERN.SUNSHINE_DEER_PARK, map.REGIONAL_WESTERN.DEER_PARK),
  deerParkToWarrnambool: MapSegment.full(map.REGIONAL_WESTERN.DEER_PARK, map.REGIONAL_WESTERN.WARRNAMBOOL),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.SOUTHERN_CROSS, station.FOOTSCRAY, [
    routeGraph.southernCrossToDeerPark,
  ], []),
  new LineShapeEdge(station.FOOTSCRAY, station.SUNSHINE, [
    routeGraph.southernCrossToDeerPark,
    routeGraph.footscrayToDeerPark,
  ], []),
  new LineShapeEdge(station.SUNSHINE, station.DEER_PARK, [
    routeGraph.southernCrossToDeerPark,
    routeGraph.footscrayToDeerPark,
    routeGraph.sunshineToDeerPark,
  ], []),
  new LineShapeEdge(station.DEER_PARK, station.TARNEIT, [
    routeGraph.deerParkToTarneit,
  ], []),
  new LineShapeEdge(station.TARNEIT, station.WYNDHAM_VALE, [
    routeGraph.tarneitToWyndhamVale,
  ], []),
  new LineShapeEdge(station.WYNDHAM_VALE, station.LITTLE_RIVER, [
    routeGraph.wyndhamValeToLittleRiver,
  ], []),
  new LineShapeEdge(station.LITTLE_RIVER, station.LARA, [
    routeGraph.littleRiverToLara,
  ], []),
  new LineShapeEdge(station.LARA, station.CORIO, [
    routeGraph.laraToCorio,
  ], []),
  new LineShapeEdge(station.CORIO, station.NORTH_SHORE, [
    routeGraph.corioToNorthShore,
  ], []),
  new LineShapeEdge(station.NORTH_SHORE, station.NORTH_GEELONG, [
    routeGraph.northShoreToNorthGeelong,
  ], []),
  new LineShapeEdge(station.NORTH_GEELONG, station.GEELONG, [
    routeGraph.northGeelongToGeelong,
  ], []),
  new LineShapeEdge(station.GEELONG, station.SOUTH_GEELONG, [
    routeGraph.geelongToSouthGeelong,
  ], []),
  new LineShapeEdge(station.SOUTH_GEELONG, station.MARSHALL, [
    routeGraph.southGeelongToMarshall,
  ], []),
  new LineShapeEdge(station.MARSHALL, station.WAURN_PONDS, [
    routeGraph.marshallToWaurnPonds,
  ], []),
  new LineShapeEdge(station.WAURN_PONDS, station.WINCHELSEA, [
    routeGraph.waurnPondsToWinchelsea,
  ], []),
  new LineShapeEdge(station.WINCHELSEA, station.BIRREGURRA, [
    routeGraph.winchelseaToBirregurra,
  ], []),
  new LineShapeEdge(station.BIRREGURRA, station.COLAC, [
    routeGraph.birregurraToColac,
  ], []),
  new LineShapeEdge(station.COLAC, station.CAMPERDOWN, [
    routeGraph.colacToCamperdown,
  ], []),
  new LineShapeEdge(station.CAMPERDOWN, station.TERANG, [
    routeGraph.camperdownToTerang,
  ], []),
  new LineShapeEdge(station.TERANG, station.SHERWOOD_PARK, [
    routeGraph.terangToSherwoodPark,
  ], []),
  new LineShapeEdge(station.SHERWOOD_PARK, station.WARRNAMBOOL, [
    routeGraph.sherwoodParkToWarrnambool,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.SOUTHERN_CROSS, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.GEELONG,
  name: "Geelong",
  ptvIds: [1745, 1853],
  route,
  lineGroup: "regional",
});
