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
  frankstonToLeawarra: new StationPair(station.FRANKSTON, station.LEAWARRA),
  leawarraToBaxter: new StationPair(station.LEAWARRA, station.BAXTER),
  baxterToSomerville: new StationPair(station.BAXTER, station.SOMERVILLE),
  somervilleToTyabb: new StationPair(station.SOMERVILLE, station.TYABB),
  tyabbToHastings: new StationPair(station.TYABB, station.HASTINGS),
  hastingsToBittern: new StationPair(station.HASTINGS, station.BITTERN),
  bitternToMorradoo: new StationPair(station.BITTERN, station.MORRADOO),
  morradooToCribPoint: new StationPair(station.MORRADOO, station.CRIB_POINT),
  cribPointToStonyPoint: new StationPair(station.CRIB_POINT, station.STONY_POINT),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.FRANKSTON, station.LEAWARRA, [
    routeGraph.frankstonToLeawarra,
  ]),
  new LineShapeEdge(station.LEAWARRA, station.BAXTER, [
    routeGraph.leawarraToBaxter,
  ]),
  new LineShapeEdge(station.BAXTER, station.SOMERVILLE, [
    routeGraph.baxterToSomerville,
  ]),
  new LineShapeEdge(station.SOMERVILLE, station.TYABB, [
    routeGraph.somervilleToTyabb,
  ]),
  new LineShapeEdge(station.TYABB, station.HASTINGS, [
    routeGraph.tyabbToHastings,
  ]),
  new LineShapeEdge(station.HASTINGS, station.BITTERN, [
    routeGraph.hastingsToBittern,
  ]),
  new LineShapeEdge(station.BITTERN, station.MORRADOO, [
    routeGraph.bitternToMorradoo,
  ]),
  new LineShapeEdge(station.MORRADOO, station.CRIB_POINT, [
    routeGraph.morradooToCribPoint,
  ]),
  new LineShapeEdge(station.CRIB_POINT, station.STONY_POINT, [
    routeGraph.cribPointToStonyPoint,
  ]),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.FRANKSTON, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.STONY_POINT,
  name: "Stony Point",
  ptvIds: [13],
  route,
  lineGroup: "suburban",
});
