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
  flindersStreetToSouthernCross: new StationPair(station.FLINDERS_STREET, station.SOUTHERN_CROSS),
  southernCrossToFlagstaff: new StationPair(station.SOUTHERN_CROSS, station.FLAGSTAFF),
  flagstaffToMelbourneCentral: new StationPair(station.FLAGSTAFF, station.MELBOURNE_CENTRAL),
  melbourneCentralToParliament: new StationPair(station.MELBOURNE_CENTRAL, station.PARLIAMENT),
  parliamentToRichmond: new StationPair(station.PARLIAMENT, station.RICHMOND),
  richmondToSouthYarra: new StationPair(station.RICHMOND, station.SOUTH_YARRA),
  southYarraToCaulfield: new StationPair(station.SOUTH_YARRA, station.CAULFIELD),
  caulfieldToCarnegie: new StationPair(station.CAULFIELD, station.CARNEGIE),
  carnegieToMurrumbeena: new StationPair(station.CARNEGIE, station.MURRUMBEENA),
  murrumbeenaToHughesdale: new StationPair(station.MURRUMBEENA, station.HUGHESDALE),
  hughesdaleToOakleigh: new StationPair(station.HUGHESDALE, station.OAKLEIGH),
  oakleighToHuntingdale: new StationPair(station.OAKLEIGH, station.HUNTINGDALE),
  huntingdaleToClayton: new StationPair(station.HUNTINGDALE, station.CLAYTON),
  claytonToWestall: new StationPair(station.CLAYTON, station.WESTALL),
  westallToSpringvale: new StationPair(station.WESTALL, station.SPRINGVALE),
  springvaleToSandownPark: new StationPair(station.SPRINGVALE, station.SANDOWN_PARK),
  sandownParkToNoblePark: new StationPair(station.SANDOWN_PARK, station.NOBLE_PARK),
  nobleParkToYarraman: new StationPair(station.NOBLE_PARK, station.YARRAMAN),
  yarramanToDandenong: new StationPair(station.YARRAMAN, station.DANDENONG),
  dandenongToHallam: new StationPair(station.DANDENONG, station.HALLAM),
  hallamToNarreWarren: new StationPair(station.HALLAM, station.NARRE_WARREN),
  narreWarrenToBerwick: new StationPair(station.NARRE_WARREN, station.BERWICK),
  berwickToBeaconsfield: new StationPair(station.BERWICK, station.BEACONSFIELD),
  beaconsfieldToOfficer: new StationPair(station.BEACONSFIELD, station.OFFICER),
  officerToCardiniaRoad: new StationPair(station.OFFICER, station.CARDINIA_ROAD),
  cardiniaRoadToPakenham: new StationPair(station.CARDINIA_ROAD, station.PAKENHAM),
  pakenhamToEastPakenham: new StationPair(station.PAKENHAM, station.EAST_PAKENHAM),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge("the-city", station.RICHMOND, [
    routeGraph.flindersStreetToRichmond,
    routeGraph.flindersStreetToSouthernCross,
    routeGraph.southernCrossToFlagstaff,
    routeGraph.flagstaffToMelbourneCentral,
    routeGraph.melbourneCentralToParliament,
    routeGraph.parliamentToRichmond,
  ], []),
  new LineShapeEdge(station.RICHMOND, station.SOUTH_YARRA, [
    routeGraph.richmondToSouthYarra,
  ], []),
  new LineShapeEdge(station.SOUTH_YARRA, station.CAULFIELD, [
    routeGraph.southYarraToCaulfield,
  ], []),
  new LineShapeEdge(station.CAULFIELD, station.CARNEGIE, [
    routeGraph.caulfieldToCarnegie,
  ], []),
  new LineShapeEdge(station.CARNEGIE, station.MURRUMBEENA, [
    routeGraph.carnegieToMurrumbeena,
  ], []),
  new LineShapeEdge(station.MURRUMBEENA, station.HUGHESDALE, [
    routeGraph.murrumbeenaToHughesdale,
  ], []),
  new LineShapeEdge(station.HUGHESDALE, station.OAKLEIGH, [
    routeGraph.hughesdaleToOakleigh,
  ], []),
  new LineShapeEdge(station.OAKLEIGH, station.HUNTINGDALE, [
    routeGraph.oakleighToHuntingdale,
  ], []),
  new LineShapeEdge(station.HUNTINGDALE, station.CLAYTON, [
    routeGraph.huntingdaleToClayton,
  ], []),
  new LineShapeEdge(station.CLAYTON, station.WESTALL, [
    routeGraph.claytonToWestall,
  ], []),
  new LineShapeEdge(station.WESTALL, station.SPRINGVALE, [
    routeGraph.westallToSpringvale,
  ], []),
  new LineShapeEdge(station.SPRINGVALE, station.SANDOWN_PARK, [
    routeGraph.springvaleToSandownPark,
  ], []),
  new LineShapeEdge(station.SANDOWN_PARK, station.NOBLE_PARK, [
    routeGraph.sandownParkToNoblePark,
  ], []),
  new LineShapeEdge(station.NOBLE_PARK, station.YARRAMAN, [
    routeGraph.nobleParkToYarraman,
  ], []),
  new LineShapeEdge(station.YARRAMAN, station.DANDENONG, [
    routeGraph.yarramanToDandenong,
  ], []),
  new LineShapeEdge(station.DANDENONG, station.HALLAM, [
    routeGraph.dandenongToHallam,
  ], []),
  new LineShapeEdge(station.HALLAM, station.NARRE_WARREN, [
    routeGraph.hallamToNarreWarren,
  ], []),
  new LineShapeEdge(station.NARRE_WARREN, station.BERWICK, [
    routeGraph.narreWarrenToBerwick,
  ], []),
  new LineShapeEdge(station.BERWICK, station.BEACONSFIELD, [
    routeGraph.berwickToBeaconsfield,
  ], []),
  new LineShapeEdge(station.BEACONSFIELD, station.OFFICER, [
    routeGraph.beaconsfieldToOfficer,
  ], []),
  new LineShapeEdge(station.OFFICER, station.CARDINIA_ROAD, [
    routeGraph.officerToCardiniaRoad,
  ], []),
  new LineShapeEdge(station.CARDINIA_ROAD, station.PAKENHAM, [
    routeGraph.cardiniaRoadToPakenham,
  ], []),
  new LineShapeEdge(station.PAKENHAM, station.EAST_PAKENHAM, [
    routeGraph.pakenhamToEastPakenham,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.PAKENHAM,
  name: "Pakenham",
  ptvIds: [11],
  route,
  lineGroup: "suburban",
});
