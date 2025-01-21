import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  caulfield,
  clayton,
  flagstaff,
  flindersStreet,
  parliament,
  richmond,
  southernCross,
  southYarra,
  dandenong as dandenongInterchange,
  pakenham,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "../segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";
import {
  caulfieldToClayton,
  claytonToDandenong,
  dandenongToHallamCurve,
  hallamCurvePakenham,
  hallamToPakenham,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "../utils-shared-corridors";

const cranbourneStraight = 45;

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong = new Line({
  origin: loop.pos.flindersStreet(loop.line.dandenong),
  angle: 180,
  color: "cyan",

  path: new Path()
    .station(flindersStreet.point("dandenong-loop"))
    .add(flindersStreetToSouthernCross(3, false))
    .station(southernCross.point("dandenong"))
    .add(southernCrossToFlagstaff(3))
    .station(flagstaff.point("dandenong"))
    .add(flagstaffToParliament(3, "dandenong"))
    .station(parliament.point("dandenong"))
    .add(richmondLoopPortal(loop.line.dandenong, 20, "dandenong-direct"))
    .station(richmond.point("dandenong"))
    .straight(richmondToSouthYarra)
    .station(southYarra.point("dandenong"))
    .straight(southYarraToCaulfield)
    .station(caulfield.point("dandenong"))
    .straight(caulfieldToClayton)
    .station(clayton.point("dandenong"))
    .straight(claytonToDandenong)
    .station(dandenongInterchange.point("dandenong"))
    .split({
      split: new Path().curve(defaultRadius, 45).straight(cranbourneStraight),
    })
    .straight(dandenongToHallamCurve)
    .curve(hallamCurvePakenham, -45)
    .straight(hallamToPakenham)
    .station(pakenham.point("pakenham"))
    .straight(pakenhamToEastPakenham),
});
