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
  flindersStreetToRichmond: new StationPair(station.FLINDERS_STREET, station.RICHMOND),
  richmondToSouthYarra: new StationPair(station.RICHMOND, station.SOUTH_YARRA),
  southYarraToPrahran: new StationPair(station.SOUTH_YARRA, station.PRAHRAN),
  prahranToWindsor: new StationPair(station.PRAHRAN, station.WINDSOR),
  windsorToBalaclava: new StationPair(station.WINDSOR, station.BALACLAVA),
  balaclavaToRipponlea: new StationPair(station.BALACLAVA, station.RIPPONLEA),
  ripponleaToElsternwick: new StationPair(station.RIPPONLEA, station.ELSTERNWICK),
  elsternwickToGardenvale: new StationPair(station.ELSTERNWICK, station.GARDENVALE),
  gardenvaleToNorthBrighton: new StationPair(station.GARDENVALE, station.NORTH_BRIGHTON),
  northBrightonToMiddleBrighton: new StationPair(station.NORTH_BRIGHTON, station.MIDDLE_BRIGHTON),
  middleBrightonToBrightonBeach: new StationPair(station.MIDDLE_BRIGHTON, station.BRIGHTON_BEACH),
  brightonBeachToHampton: new StationPair(station.BRIGHTON_BEACH, station.HAMPTON),
  hamptonToSandringham: new StationPair(station.HAMPTON, station.SANDRINGHAM),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.FLINDERS_STREET, station.RICHMOND, [
    routeGraph.flindersStreetToRichmond,
  ], []),
  new LineShapeEdge(station.RICHMOND, station.SOUTH_YARRA, [
    routeGraph.richmondToSouthYarra,
  ], []),
  new LineShapeEdge(station.SOUTH_YARRA, station.PRAHRAN, [
    routeGraph.southYarraToPrahran,
  ], []),
  new LineShapeEdge(station.PRAHRAN, station.WINDSOR, [
    routeGraph.prahranToWindsor,
  ], []),
  new LineShapeEdge(station.WINDSOR, station.BALACLAVA, [
    routeGraph.windsorToBalaclava,
  ], []),
  new LineShapeEdge(station.BALACLAVA, station.RIPPONLEA, [
    routeGraph.balaclavaToRipponlea,
  ], []),
  new LineShapeEdge(station.RIPPONLEA, station.ELSTERNWICK, [
    routeGraph.ripponleaToElsternwick,
  ], []),
  new LineShapeEdge(station.ELSTERNWICK, station.GARDENVALE, [
    routeGraph.elsternwickToGardenvale,
  ], []),
  new LineShapeEdge(station.GARDENVALE, station.NORTH_BRIGHTON, [
    routeGraph.gardenvaleToNorthBrighton,
  ], []),
  new LineShapeEdge(station.NORTH_BRIGHTON, station.MIDDLE_BRIGHTON, [
    routeGraph.northBrightonToMiddleBrighton,
  ], []),
  new LineShapeEdge(station.MIDDLE_BRIGHTON, station.BRIGHTON_BEACH, [
    routeGraph.middleBrightonToBrightonBeach,
  ], []),
  new LineShapeEdge(station.BRIGHTON_BEACH, station.HAMPTON, [
    routeGraph.brightonBeachToHampton,
  ], []),
  new LineShapeEdge(station.HAMPTON, station.SANDRINGHAM, [
    routeGraph.hamptonToSandringham,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.FLINDERS_STREET, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.SANDRINGHAM,
  name: "Sandringham",
  ptvIds: [12],
  route,
  lineGroup: "suburban",
});
