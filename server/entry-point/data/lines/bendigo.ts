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
  southernCrossToSunbury: new StationPair(station.SOUTHERN_CROSS, station.SUNBURY),
  footscrayToSunbury: new StationPair(station.FOOTSCRAY, station.SUNBURY),
  watergardensToSunbury: new StationPair(station.WATERGARDENS, station.SUNBURY),
  sunburyToClarkefield: new StationPair(station.SUNBURY, station.CLARKEFIELD),
  clarkefieldToRiddellsCreek: new StationPair(station.CLARKEFIELD, station.RIDDELLS_CREEK),
  riddellsCreekToGisborne: new StationPair(station.RIDDELLS_CREEK, station.GISBORNE),
  gisborneToMacedon: new StationPair(station.GISBORNE, station.MACEDON),
  macedonToWoodend: new StationPair(station.MACEDON, station.WOODEND),
  woodendToKyneton: new StationPair(station.WOODEND, station.KYNETON),
  kynetonToMalmsbury: new StationPair(station.KYNETON, station.MALMSBURY),
  malmsburyToCastlemaine: new StationPair(station.MALMSBURY, station.CASTLEMAINE),
  castlemaineToKangarooFlat: new StationPair(station.CASTLEMAINE, station.KANGAROO_FLAT),
  kangarooFlatToBendigo: new StationPair(station.KANGAROO_FLAT, station.BENDIGO),
  bendigoToEpsom: new StationPair(station.BENDIGO, station.EPSOM),
  epsomToHuntly: new StationPair(station.EPSOM, station.HUNTLY),
  huntlyToGoornong: new StationPair(station.HUNTLY, station.GOORNONG),
  goornongToElmore: new StationPair(station.GOORNONG, station.ELMORE),
  elmoreToRochester: new StationPair(station.ELMORE, station.ROCHESTER),
  rochesterToEchuca: new StationPair(station.ROCHESTER, station.ECHUCA),
  bendigoToEaglehawk: new StationPair(station.BENDIGO, station.EAGLEHAWK),
  eaglehawkToRaywood: new StationPair(station.EAGLEHAWK, station.RAYWOOD),
  raywoodToDingee: new StationPair(station.RAYWOOD, station.DINGEE),
  dingeeToPyramid: new StationPair(station.DINGEE, station.PYRAMID),
  pyramidToKerang: new StationPair(station.PYRAMID, station.KERANG),
  kerangToSwanHill: new StationPair(station.KERANG, station.SWAN_HILL),
};

// prettier-ignore
const mapSegment = {
  southernCrossToNorthMelbourneJunction: MapSegment.full(map.REGIONAL_WESTERN.SOUTHERN_CROSS, map.REGIONAL_WESTERN.NORTH_MELBOURNE_JUNCTION),
  northMelbourneJunctionToNorthMelbourne: MapSegment.full(map.REGIONAL_WESTERN.NORTH_MELBOURNE_JUNCTION, map.REGIONAL_WESTERN.NORTH_MELBOURNE_RRL),
  northMelbourneToFootscray: MapSegment.full(map.REGIONAL_WESTERN.NORTH_MELBOURNE_RRL, map.REGIONAL_WESTERN.FOOTSCRAY),
  footscrayToSunshineJunction: MapSegment.full(map.REGIONAL_WESTERN.FOOTSCRAY, map.REGIONAL_WESTERN.SUNSHINE_JUNCTION),
  sunshineJunctionToSunshine: MapSegment.full(map.REGIONAL_WESTERN.SUNSHINE_JUNCTION, map.REGIONAL_WESTERN.SUNSHINE_BENDIGO),
  sunshineToWatergardens: MapSegment.full(map.REGIONAL_WESTERN.SUNSHINE_BENDIGO, map.REGIONAL_WESTERN.WATERGARDENS),
  watergardensToSunbury: MapSegment.full(map.REGIONAL_WESTERN.WATERGARDENS, map.REGIONAL_WESTERN.SUNBURY),
  sunburyToBendigo: MapSegment.full(map.REGIONAL_WESTERN.SUNBURY, map.REGIONAL_WESTERN.BENDIGO),
  bendigoToEchuca: MapSegment.full(map.REGIONAL_WESTERN.BENDIGO, map.REGIONAL_WESTERN.ECHUCA),
  bendigoToSwanHill: MapSegment.full(map.REGIONAL_WESTERN.BENDIGO, map.REGIONAL_WESTERN.SWAN_HILL),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.SOUTHERN_CROSS, station.FOOTSCRAY, [
    routeGraph.southernCrossToSunbury,
  ], []),
  new LineShapeEdge(station.FOOTSCRAY, station.WATERGARDENS, [
    routeGraph.southernCrossToSunbury,
    routeGraph.footscrayToSunbury,
  ], []),
  new LineShapeEdge(station.WATERGARDENS, station.SUNBURY, [
    routeGraph.southernCrossToSunbury,
    routeGraph.footscrayToSunbury,
    routeGraph.watergardensToSunbury,
  ], []),
  new LineShapeEdge(station.SUNBURY, station.CLARKEFIELD, [
    routeGraph.sunburyToClarkefield,
  ], []),
  new LineShapeEdge(station.CLARKEFIELD, station.RIDDELLS_CREEK, [
    routeGraph.clarkefieldToRiddellsCreek,
  ], []),
  new LineShapeEdge(station.RIDDELLS_CREEK, station.GISBORNE, [
    routeGraph.riddellsCreekToGisborne,
  ], []),
  new LineShapeEdge(station.GISBORNE, station.MACEDON, [
    routeGraph.gisborneToMacedon,
  ], []),
  new LineShapeEdge(station.MACEDON, station.WOODEND, [
    routeGraph.macedonToWoodend,
  ], []),
  new LineShapeEdge(station.WOODEND, station.KYNETON, [
    routeGraph.woodendToKyneton,
  ], []),
  new LineShapeEdge(station.KYNETON, station.MALMSBURY, [
    routeGraph.kynetonToMalmsbury,
  ], []),
  new LineShapeEdge(station.MALMSBURY, station.CASTLEMAINE, [
    routeGraph.malmsburyToCastlemaine,
  ], []),
  new LineShapeEdge(station.CASTLEMAINE, station.KANGAROO_FLAT, [
    routeGraph.castlemaineToKangarooFlat,
  ], []),
  new LineShapeEdge(station.KANGAROO_FLAT, station.BENDIGO, [
    routeGraph.kangarooFlatToBendigo,
  ], []),
  new LineShapeEdge(station.BENDIGO, station.EPSOM, [
    routeGraph.bendigoToEpsom,
  ], []),
  new LineShapeEdge(station.EPSOM, station.HUNTLY, [
    routeGraph.epsomToHuntly,
  ], []),
  new LineShapeEdge(station.HUNTLY, station.GOORNONG, [
    routeGraph.huntlyToGoornong,
  ], []),
  new LineShapeEdge(station.GOORNONG, station.ELMORE, [
    routeGraph.goornongToElmore,
  ], []),
  new LineShapeEdge(station.ELMORE, station.ROCHESTER, [
    routeGraph.elmoreToRochester,
  ], []),
  new LineShapeEdge(station.ROCHESTER, station.ECHUCA, [
    routeGraph.rochesterToEchuca,
  ], []),
  new LineShapeEdge(station.BENDIGO, station.EAGLEHAWK, [
    routeGraph.bendigoToEaglehawk,
  ], []),
  new LineShapeEdge(station.EAGLEHAWK, station.RAYWOOD, [
    routeGraph.eaglehawkToRaywood,
  ], []),
  new LineShapeEdge(station.RAYWOOD, station.DINGEE, [
    routeGraph.raywoodToDingee,
  ], []),
  new LineShapeEdge(station.DINGEE, station.PYRAMID, [
    routeGraph.dingeeToPyramid,
  ], []),
  new LineShapeEdge(station.PYRAMID, station.KERANG, [
    routeGraph.pyramidToKerang,
  ], []),
  new LineShapeEdge(station.KERANG, station.SWAN_HILL, [
    routeGraph.kerangToSwanHill,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.SOUTHERN_CROSS, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.BENDIGO,
  name: "Bendigo",
  ptvIds: [1740, 1848, 1849],
  route,
  lineGroup: "regional",
});
