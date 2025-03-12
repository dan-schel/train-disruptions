import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
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
} from "@/scripts/generate-map-geometry/ptv/interchanges";
import { flagstaffToParliament } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "@/scripts/generate-map-geometry/ptv/segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-flagstaff";
import { defaultRadius } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  caulfieldToClayton,
  claytonToDandenong,
  dandenongToHallamCurve,
  hallamCurvePakenham,
  hallamToPakenham,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";

const loopPortalStraight = flexi(20);
const cranbourneStraight = flexi(30, 45);

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.dandenong),
  angle: 180,
  color: "cyan",

  path: new PathBlueprint()
    .station(flindersStreet.point("dandenong-loop"))
    .add(flindersStreetToSouthernCross(3, false))
    .station(southernCross.point("dandenong"))
    .add(southernCrossToFlagstaff(3))
    .station(flagstaff.point("dandenong"))
    .add(flagstaffToParliament(3, "dandenong"))
    .station(parliament.point("dandenong"))
    .add(
      richmondLoopPortal(
        loop.line.dandenong,
        loopPortalStraight,
        "dandenong-direct",
      ),
    )
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
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(cranbourneStraight)
        .terminus(),
    })
    .straight(dandenongToHallamCurve)
    .curve(hallamCurvePakenham, -45)
    .straight(hallamToPakenham)
    .station(pakenham.point("pakenham"))
    .straight(pakenhamToEastPakenham)
    .terminus(),
});
