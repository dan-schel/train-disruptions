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
  richmondToEastRichmond: new StationPair(station.RICHMOND, station.EAST_RICHMOND),
  eastRichmondToBurnley: new StationPair(station.EAST_RICHMOND, station.BURNLEY),
  burnleyToHeyington: new StationPair(station.BURNLEY, station.HEYINGTON),
  heyingtonToKooyong: new StationPair(station.HEYINGTON, station.KOOYONG),
  kooyongToTooronga: new StationPair(station.KOOYONG, station.TOORONGA),
  toorongaToGardiner: new StationPair(station.TOORONGA, station.GARDINER),
  gardinerToGlenIris: new StationPair(station.GARDINER, station.GLEN_IRIS),
  glenIrisToDarling: new StationPair(station.GLEN_IRIS, station.DARLING),
  darlingToEastMalvern: new StationPair(station.DARLING, station.EAST_MALVERN),
  eastMalvernToHolmesglen: new StationPair(station.EAST_MALVERN, station.HOLMESGLEN),
  holmesglenToJordanville: new StationPair(station.HOLMESGLEN, station.JORDANVILLE),
  jordanvilleToMountWaverley: new StationPair(station.JORDANVILLE, station.MOUNT_WAVERLEY),
  mountWaverleyToSyndal: new StationPair(station.MOUNT_WAVERLEY, station.SYNDAL),
  syndalToGlenWaverley: new StationPair(station.SYNDAL, station.GLEN_WAVERLEY),
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
  new LineShapeEdge(station.RICHMOND, station.EAST_RICHMOND, [
    routeGraph.richmondToEastRichmond,
  ], []),
  new LineShapeEdge(station.EAST_RICHMOND, station.BURNLEY, [
    routeGraph.eastRichmondToBurnley,
  ], []),
  new LineShapeEdge(station.BURNLEY, station.HEYINGTON, [
    routeGraph.burnleyToHeyington,
  ], []),
  new LineShapeEdge(station.HEYINGTON, station.KOOYONG, [
    routeGraph.heyingtonToKooyong,
  ], []),
  new LineShapeEdge(station.KOOYONG, station.TOORONGA, [
    routeGraph.kooyongToTooronga,
  ], []),
  new LineShapeEdge(station.TOORONGA, station.GARDINER, [
    routeGraph.toorongaToGardiner,
  ], []),
  new LineShapeEdge(station.GARDINER, station.GLEN_IRIS, [
    routeGraph.gardinerToGlenIris,
  ], []),
  new LineShapeEdge(station.GLEN_IRIS, station.DARLING, [
    routeGraph.glenIrisToDarling,
  ], []),
  new LineShapeEdge(station.DARLING, station.EAST_MALVERN, [
    routeGraph.darlingToEastMalvern,
  ], []),
  new LineShapeEdge(station.EAST_MALVERN, station.HOLMESGLEN, [
    routeGraph.eastMalvernToHolmesglen,
  ], []),
  new LineShapeEdge(station.HOLMESGLEN, station.JORDANVILLE, [
    routeGraph.holmesglenToJordanville,
  ], []),
  new LineShapeEdge(station.JORDANVILLE, station.MOUNT_WAVERLEY, [
    routeGraph.jordanvilleToMountWaverley,
  ], []),
  new LineShapeEdge(station.MOUNT_WAVERLEY, station.SYNDAL, [
    routeGraph.mountWaverleyToSyndal,
  ], []),
  new LineShapeEdge(station.SYNDAL, station.GLEN_WAVERLEY, [
    routeGraph.syndalToGlenWaverley,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.GLEN_WAVERLEY,
  name: "Glen Waverley",
  ptvIds: [7],
  route,
  lineGroup: "suburban",
});
