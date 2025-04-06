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
  southernCrossToArdeer: new StationPair(station.SOUTHERN_CROSS, station.ARDEER),
  footscrayToArdeer: new StationPair(station.FOOTSCRAY, station.ARDEER),
  sunshineToArdeer: new StationPair(station.SUNSHINE, station.ARDEER),
  ardeerToDeerPark: new StationPair(station.ARDEER, station.DEER_PARK),
  deerParkToCarolineSprings: new StationPair(station.DEER_PARK, station.CAROLINE_SPRINGS),
  carolineSpringsToRockbank: new StationPair(station.CAROLINE_SPRINGS, station.ROCKBANK),
  rockbankToCobblebank: new StationPair(station.ROCKBANK, station.COBBLEBANK),
  cobblebankToMelton: new StationPair(station.COBBLEBANK, station.MELTON),
  meltonToBacchusMarsh: new StationPair(station.MELTON, station.BACCHUS_MARSH),
  bacchusMarshToBallan: new StationPair(station.BACCHUS_MARSH, station.BALLAN),
  ballanToBallarat: new StationPair(station.BALLAN, station.BALLARAT),
  ballaratToCreswick: new StationPair(station.BALLARAT, station.CRESWICK),
  creswickToClunes: new StationPair(station.CRESWICK, station.CLUNES),
  clunesToTalbot: new StationPair(station.CLUNES, station.TALBOT),
  talbotToMaryborough: new StationPair(station.TALBOT, station.MARYBOROUGH),
  ballaratToWendouree: new StationPair(station.BALLARAT, station.WENDOUREE),
  wendoureeToBeaufort: new StationPair(station.WENDOUREE, station.BEAUFORT),
  beaufortToArarat: new StationPair(station.BEAUFORT, station.ARARAT),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.SOUTHERN_CROSS, station.FOOTSCRAY, [
    routeGraph.southernCrossToArdeer,
  ], []),
  new LineShapeEdge(station.FOOTSCRAY, station.SUNSHINE, [
    routeGraph.southernCrossToArdeer,
    routeGraph.footscrayToArdeer,
  ], []),
  new LineShapeEdge(station.SUNSHINE, station.ARDEER, [
    routeGraph.southernCrossToArdeer,
    routeGraph.footscrayToArdeer,
    routeGraph.sunshineToArdeer,
  ], []),
  new LineShapeEdge(station.ARDEER, station.DEER_PARK, [
    routeGraph.ardeerToDeerPark,
  ], []),
  new LineShapeEdge(station.DEER_PARK, station.CAROLINE_SPRINGS, [
    routeGraph.deerParkToCarolineSprings,
  ], []),
  new LineShapeEdge(station.CAROLINE_SPRINGS, station.ROCKBANK, [
    routeGraph.carolineSpringsToRockbank,
  ], []),
  new LineShapeEdge(station.ROCKBANK, station.COBBLEBANK, [
    routeGraph.rockbankToCobblebank,
  ], []),
  new LineShapeEdge(station.COBBLEBANK, station.MELTON, [
    routeGraph.cobblebankToMelton,
  ], []),
  new LineShapeEdge(station.MELTON, station.BACCHUS_MARSH, [
    routeGraph.meltonToBacchusMarsh,
  ], []),
  new LineShapeEdge(station.BACCHUS_MARSH, station.BALLAN, [
    routeGraph.bacchusMarshToBallan,
  ], []),
  new LineShapeEdge(station.BALLAN, station.BALLARAT, [
    routeGraph.ballanToBallarat,
  ], []),
  new LineShapeEdge(station.BALLARAT, station.CRESWICK, [
    routeGraph.ballaratToCreswick,
  ], []),
  new LineShapeEdge(station.CRESWICK, station.CLUNES, [
    routeGraph.creswickToClunes,
  ], []),
  new LineShapeEdge(station.CLUNES, station.TALBOT, [
    routeGraph.clunesToTalbot,
  ], []),
  new LineShapeEdge(station.TALBOT, station.MARYBOROUGH, [
    routeGraph.talbotToMaryborough,
  ], []),
  new LineShapeEdge(station.BALLARAT, station.WENDOUREE, [
    routeGraph.ballaratToWendouree,
  ], []),
  new LineShapeEdge(station.WENDOUREE, station.BEAUFORT, [
    routeGraph.wendoureeToBeaufort,
  ], []),
  new LineShapeEdge(station.BEAUFORT, station.ARARAT, [
    routeGraph.beaufortToArarat,
  ], []),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.SOUTHERN_CROSS, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.BALLARAT,
  name: "Ballarat",
  ptvIds: [1728, 1837, 4871],
  route,
  lineGroup: "regional",
});
