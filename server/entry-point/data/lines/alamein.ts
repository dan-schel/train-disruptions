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
  burnleyToHawthorn: new StationPair(station.BURNLEY, station.HAWTHORN),
  hawthornToGlenferrie: new StationPair(station.HAWTHORN, station.GLENFERRIE),
  glenferrieToAuburn: new StationPair(station.GLENFERRIE, station.AUBURN),
  auburnToCamberwell: new StationPair(station.AUBURN, station.CAMBERWELL),
  camberwellToRiversdale: new StationPair(station.CAMBERWELL, station.RIVERSDALE),
  riversdaleToWillison: new StationPair(station.RIVERSDALE, station.WILLISON),
  willisonToHartwell: new StationPair(station.WILLISON, station.HARTWELL),
  hartwellToBurwood: new StationPair(station.HARTWELL, station.BURWOOD),
  burwoodToAshburton: new StationPair(station.BURWOOD, station.ASHBURTON),
  ashburtonToAlamein: new StationPair(station.ASHBURTON, station.ALAMEIN),
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
  new LineShapeEdge(station.BURNLEY, station.HAWTHORN, [
    routeGraph.burnleyToHawthorn,
  ], []),
  new LineShapeEdge(station.HAWTHORN, station.GLENFERRIE, [
    routeGraph.hawthornToGlenferrie,
  ], []),
  new LineShapeEdge(station.GLENFERRIE, station.AUBURN, [
    routeGraph.glenferrieToAuburn,
  ], []),
  new LineShapeEdge(station.AUBURN, station.CAMBERWELL, [
    routeGraph.auburnToCamberwell,
  ], []),
  new LineShapeEdge(station.CAMBERWELL, station.RIVERSDALE, [
    routeGraph.camberwellToRiversdale,
  ], []),
  new LineShapeEdge(station.RIVERSDALE, station.WILLISON, [
    routeGraph.riversdaleToWillison,
  ], []),
  new LineShapeEdge(station.WILLISON, station.HARTWELL, [
    routeGraph.willisonToHartwell,
  ], []),
  new LineShapeEdge(station.HARTWELL, station.BURWOOD, [
    routeGraph.hartwellToBurwood,
  ], []),
  new LineShapeEdge(station.BURWOOD, station.ASHBURTON, [
    routeGraph.burwoodToAshburton,
  ], []),
  new LineShapeEdge(station.ASHBURTON, station.ALAMEIN, [
    routeGraph.ashburtonToAlamein,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.ALAMEIN,
  name: "Alamein",
  ptvIds: [1],
  route,
  lineGroup: "suburban",
});
