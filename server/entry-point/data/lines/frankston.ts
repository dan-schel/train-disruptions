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
  southYarraToHawksburn: new StationPair(station.SOUTH_YARRA, station.HAWKSBURN),
  hawksburnToToorak: new StationPair(station.HAWKSBURN, station.TOORAK),
  toorakToArmadale: new StationPair(station.TOORAK, station.ARMADALE),
  armadaleToMalvern: new StationPair(station.ARMADALE, station.MALVERN),
  malvernToCaulfield: new StationPair(station.MALVERN, station.CAULFIELD),
  caulfieldToGlenHuntly: new StationPair(station.CAULFIELD, station.GLEN_HUNTLY),
  glenHuntlyToOrmond: new StationPair(station.GLEN_HUNTLY, station.ORMOND),
  ormondToMcKinnon: new StationPair(station.ORMOND, station.MCKINNON),
  mcKinnonToBentleigh: new StationPair(station.MCKINNON, station.BENTLEIGH),
  bentleighToPatterson: new StationPair(station.BENTLEIGH, station.PATTERSON),
  pattersonToMoorabbin: new StationPair(station.PATTERSON, station.MOORABBIN),
  moorabbinToHighett: new StationPair(station.MOORABBIN, station.HIGHETT),
  highettToSouthland: new StationPair(station.HIGHETT, station.SOUTHLAND),
  southlandToCheltenham: new StationPair(station.SOUTHLAND, station.CHELTENHAM),
  cheltenhamToMentone: new StationPair(station.CHELTENHAM, station.MENTONE),
  mentoneToParkdale: new StationPair(station.MENTONE, station.PARKDALE),
  parkdaleToMordialloc: new StationPair(station.PARKDALE, station.MORDIALLOC),
  mordiallocToAspendale: new StationPair(station.MORDIALLOC, station.ASPENDALE),
  aspendaleToEdithvale: new StationPair(station.ASPENDALE, station.EDITHVALE),
  edithvaleToChelsea: new StationPair(station.EDITHVALE, station.CHELSEA),
  chelseaToBonbeach: new StationPair(station.CHELSEA, station.BONBEACH),
  bonbeachToCarrum: new StationPair(station.BONBEACH, station.CARRUM),
  carrumToSeaford: new StationPair(station.CARRUM, station.SEAFORD),
  seafordToKananook: new StationPair(station.SEAFORD, station.KANANOOK),
  kananookToFrankston: new StationPair(station.KANANOOK, station.FRANKSTON),
};

// prettier-ignore
const lineShapeEdges = [
  new LineShapeEdge(station.FLINDERS_STREET, station.RICHMOND, [
    routeGraph.flindersStreetToRichmond,
  ]),
  new LineShapeEdge(station.RICHMOND, station.SOUTH_YARRA, [
    routeGraph.richmondToSouthYarra,
  ]),
  new LineShapeEdge(station.SOUTH_YARRA, station.HAWKSBURN, [
    routeGraph.southYarraToHawksburn,
  ]),
  new LineShapeEdge(station.HAWKSBURN, station.TOORAK, [
    routeGraph.hawksburnToToorak,
  ]),
  new LineShapeEdge(station.TOORAK, station.ARMADALE, [
    routeGraph.toorakToArmadale,
  ]),
  new LineShapeEdge(station.ARMADALE, station.MALVERN, [
    routeGraph.armadaleToMalvern,
  ]),
  new LineShapeEdge(station.MALVERN, station.CAULFIELD, [
    routeGraph.malvernToCaulfield,
  ]),
  new LineShapeEdge(station.CAULFIELD, station.GLEN_HUNTLY, [
    routeGraph.caulfieldToGlenHuntly,
  ]),
  new LineShapeEdge(station.GLEN_HUNTLY, station.ORMOND, [
    routeGraph.glenHuntlyToOrmond,
  ]),
  new LineShapeEdge(station.ORMOND, station.MCKINNON, [
    routeGraph.ormondToMcKinnon,
  ]),
  new LineShapeEdge(station.MCKINNON, station.BENTLEIGH, [
    routeGraph.mcKinnonToBentleigh,
  ]),
  new LineShapeEdge(station.BENTLEIGH, station.PATTERSON, [
    routeGraph.bentleighToPatterson,
  ]),
  new LineShapeEdge(station.PATTERSON, station.MOORABBIN, [
    routeGraph.pattersonToMoorabbin,
  ]),
  new LineShapeEdge(station.MOORABBIN, station.HIGHETT, [
    routeGraph.moorabbinToHighett,
  ]),
  new LineShapeEdge(station.HIGHETT, station.SOUTHLAND, [
    routeGraph.highettToSouthland,
  ]),
  new LineShapeEdge(station.SOUTHLAND, station.CHELTENHAM, [
    routeGraph.southlandToCheltenham,
  ]),
  new LineShapeEdge(station.CHELTENHAM, station.MENTONE, [
    routeGraph.cheltenhamToMentone,
  ]),
  new LineShapeEdge(station.MENTONE, station.PARKDALE, [
    routeGraph.mentoneToParkdale,
  ]),
  new LineShapeEdge(station.PARKDALE, station.MORDIALLOC, [
    routeGraph.parkdaleToMordialloc,
  ]),
  new LineShapeEdge(station.MORDIALLOC, station.ASPENDALE, [
    routeGraph.mordiallocToAspendale,
  ]),
  new LineShapeEdge(station.ASPENDALE, station.EDITHVALE, [
    routeGraph.aspendaleToEdithvale,
  ]),
  new LineShapeEdge(station.EDITHVALE, station.CHELSEA, [
    routeGraph.edithvaleToChelsea,
  ]),
  new LineShapeEdge(station.CHELSEA, station.BONBEACH, [
    routeGraph.chelseaToBonbeach,
  ]),
  new LineShapeEdge(station.BONBEACH, station.CARRUM, [
    routeGraph.bonbeachToCarrum,
  ]),
  new LineShapeEdge(station.CARRUM, station.SEAFORD, [
    routeGraph.carrumToSeaford,
  ]),
  new LineShapeEdge(station.SEAFORD, station.KANANOOK, [
    routeGraph.seafordToKananook,
  ]),
  new LineShapeEdge(station.KANANOOK, station.FRANKSTON, [
    routeGraph.kananookToFrankston,
  ]),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape(station.FLINDERS_STREET, lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.FRANKSTON,
  name: "Frankston",
  ptvIds: [6],
  route,
  lineGroup: "suburban",
});
