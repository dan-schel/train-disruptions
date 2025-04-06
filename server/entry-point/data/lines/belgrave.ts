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
  camberwellToEastCamberwell: new StationPair(station.CAMBERWELL, station.EAST_CAMBERWELL),
  eastCamberwellToCanterbury: new StationPair(station.EAST_CAMBERWELL, station.CANTERBURY),
  canterburyToChatham: new StationPair(station.CANTERBURY, station.CHATHAM),
  chathamToUnion: new StationPair(station.CHATHAM, station.UNION),
  unionToBoxHill: new StationPair(station.UNION, station.BOX_HILL),
  boxHillToLaburnum: new StationPair(station.BOX_HILL, station.LABURNUM),
  laburnumToBlackburn: new StationPair(station.LABURNUM, station.BLACKBURN),
  blackburnToNunawading: new StationPair(station.BLACKBURN, station.NUNAWADING),
  nunawadingToMitcham: new StationPair(station.NUNAWADING, station.MITCHAM),
  mitchamToHeatherdale: new StationPair(station.MITCHAM, station.HEATHERDALE),
  heatherdaleToRingwood: new StationPair(station.HEATHERDALE, station.RINGWOOD),
  ringwoodToHeathmont: new StationPair(station.RINGWOOD, station.HEATHMONT),
  heathmontToBayswater: new StationPair(station.HEATHMONT, station.BAYSWATER),
  bayswaterToBoronia: new StationPair(station.BAYSWATER, station.BORONIA),
  boroniaToFerntreeGully: new StationPair(station.BORONIA, station.FERNTREE_GULLY),
  ferntreeGullyToUpperFerntreeGully: new StationPair(station.FERNTREE_GULLY, station.UPPER_FERNTREE_GULLY),
  upperFerntreeGullyToUpwey: new StationPair(station.UPPER_FERNTREE_GULLY, station.UPWEY),
  upweyToTecoma: new StationPair(station.UPWEY, station.TECOMA),
  tecomaToBelgrave: new StationPair(station.TECOMA, station.BELGRAVE),
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
  ]),
  new LineShapeEdge(station.RICHMOND, station.EAST_RICHMOND, [
    routeGraph.richmondToEastRichmond,
  ]),
  new LineShapeEdge(station.EAST_RICHMOND, station.BURNLEY, [
    routeGraph.eastRichmondToBurnley,
  ]),
  new LineShapeEdge(station.BURNLEY, station.HAWTHORN, [
    routeGraph.burnleyToHawthorn,
  ]),
  new LineShapeEdge(station.HAWTHORN, station.GLENFERRIE, [
    routeGraph.hawthornToGlenferrie,
  ]),
  new LineShapeEdge(station.GLENFERRIE, station.AUBURN, [
    routeGraph.glenferrieToAuburn,
  ]),
  new LineShapeEdge(station.AUBURN, station.CAMBERWELL, [
    routeGraph.auburnToCamberwell,
  ]),
  new LineShapeEdge(station.CAMBERWELL, station.EAST_CAMBERWELL, [
    routeGraph.camberwellToEastCamberwell,
  ]),
  new LineShapeEdge(station.EAST_CAMBERWELL, station.CANTERBURY, [
    routeGraph.eastCamberwellToCanterbury,
  ]),
  new LineShapeEdge(station.CANTERBURY, station.CHATHAM, [
    routeGraph.canterburyToChatham,
  ]),
  new LineShapeEdge(station.CHATHAM, station.UNION, [
    routeGraph.chathamToUnion,
  ]),
  new LineShapeEdge(station.UNION, station.BOX_HILL, [
    routeGraph.unionToBoxHill,
  ]),
  new LineShapeEdge(station.BOX_HILL, station.LABURNUM, [
    routeGraph.boxHillToLaburnum,
  ]),
  new LineShapeEdge(station.LABURNUM, station.BLACKBURN, [
    routeGraph.laburnumToBlackburn,
  ]),
  new LineShapeEdge(station.BLACKBURN, station.NUNAWADING, [
    routeGraph.blackburnToNunawading,
  ]),
  new LineShapeEdge(station.NUNAWADING, station.MITCHAM, [
    routeGraph.nunawadingToMitcham,
  ]),
  new LineShapeEdge(station.MITCHAM, station.HEATHERDALE, [
    routeGraph.mitchamToHeatherdale,
  ]),
  new LineShapeEdge(station.HEATHERDALE, station.RINGWOOD, [
    routeGraph.heatherdaleToRingwood,
  ]),
  new LineShapeEdge(station.RINGWOOD, station.HEATHMONT, [
    routeGraph.ringwoodToHeathmont,
  ]),
  new LineShapeEdge(station.HEATHMONT, station.BAYSWATER, [
    routeGraph.heathmontToBayswater,
  ]),
  new LineShapeEdge(station.BAYSWATER, station.BORONIA, [
    routeGraph.bayswaterToBoronia,
  ]),
  new LineShapeEdge(station.BORONIA, station.FERNTREE_GULLY, [
    routeGraph.boroniaToFerntreeGully,
  ]),
  new LineShapeEdge(station.FERNTREE_GULLY, station.UPPER_FERNTREE_GULLY, [
    routeGraph.ferntreeGullyToUpperFerntreeGully,
  ]),
  new LineShapeEdge(station.UPPER_FERNTREE_GULLY, station.UPWEY, [
    routeGraph.upperFerntreeGullyToUpwey,
  ]),
  new LineShapeEdge(station.UPWEY, station.TECOMA, [
    routeGraph.upweyToTecoma,
  ]),
  new LineShapeEdge(station.TECOMA, station.BELGRAVE, [
    routeGraph.tecomaToBelgrave,
  ]),
];

const routeGraphPairs = Object.values(routeGraph);
const lineShape = new LineShape("the-city", lineShapeEdges);
const route = new LineRoute(routeGraphPairs, lineShape);

export const line = new Line({
  id: id.BELGRAVE,
  name: "Belgrave",
  ptvIds: [2],
  route,
  lineGroup: "suburban",
});
