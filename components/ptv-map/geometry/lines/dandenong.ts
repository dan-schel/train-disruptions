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
    .straight(15)
    .station(southYarra.point("dandenong"))
    .straight(30)
    .station(caulfield.point("dandenong"))
    .straight(30)
    .station(clayton.point("dandenong"))
    .straight(30)
    .station(dandenongInterchange.point("dandenong"))
    .split({
      split: new Path().curve(defaultRadius, 45).straight(30),
    })
    .straight(20)
    .curve(defaultRadius, -45)
    .straight(20)
    .station(pakenham.point("pakenham"))
    .straight(10),
});
