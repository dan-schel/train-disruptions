import { JOLIMONT } from "../../../../server/data/station-ids";
import { flexi } from "../../lib/dimensions/flexi-length";
import { LineBlueprint } from "../../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import {
  flagstaff,
  flindersStreet,
  parliament,
  southernCross,
  cliftonHill as cliftonHillInterchange,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { jolimontLoopPortal } from "../segments/jolimont-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import { defaultRadius, standardDiagonal } from "../utils";
import * as loop from "../utils-city-loop";

const cliftonHillStraight = flexi(40, 80);
const heidelbergStraight = flexi(40, 80);
const hurstbridgeStraight = flexi(50, 100);
const prestonStraight = flexi(40, 80);
const keonParkStraight = standardDiagonal;
const merndaStraight = flexi(50, 100);

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.cliftonHill),
  angle: 180,
  color: "red",

  path: new PathBlueprint()
    .station(flindersStreet.point("clifton-hill-loop"))
    .add(flindersStreetToSouthernCross(1, false))
    .station(southernCross.point("clifton-hill"))
    .add(southernCrossToFlagstaff(1))
    .station(flagstaff.point("clifton-hill"))
    .add(flagstaffToParliament(1, "clifton-hill"))
    .station(parliament.point("clifton-hill"))
    .add(jolimontLoopPortal())
    .station(JOLIMONT)
    .straight(cliftonHillStraight)
    .station(cliftonHillInterchange.point("clifton-hill"))
    .split({
      split: new PathBlueprint()
        .straight(heidelbergStraight)
        .curve(defaultRadius, 45)
        .straight(hurstbridgeStraight)
        .terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(prestonStraight)
    .curve(defaultRadius, 45)
    .straight(keonParkStraight)
    .curve(defaultRadius, 45)
    .straight(merndaStraight)
    .terminus(),
});
