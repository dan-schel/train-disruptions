import { flexi } from "../../lib/dimensions/flexi-length";
import { LineBlueprint } from "../../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import {
  flagstaff,
  flindersStreet,
  parliament,
  richmond,
  southernCross,
  burnley as burnleyInterchange,
  camberwell,
  ringwood,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "../segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";

const loopPortalStraight = flexi(25);
const burnleyStraight = flexi(20, 40);
const glenIrisStraight = flexi(35, 70);
const glenWaverleyStraight = flexi(45, 90);
const camberwellStraight = flexi(25, 50);
const riversdaleStraight = flexi(15, 30);
const alameinStraight = flexi(25, 50);
const laburnumStraight = flexi(35, 70);
const ringwoodStraight = flexi(30, 60);
const belgraveStraight = flexi(40, 80);
const lilydaleStraight = flexi(40, 80);

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.burnley),
  angle: 180,
  color: "blue",

  // TODO: Need a way to specify the stations between defined points.
  path: new PathBlueprint()
    .station(flindersStreet.point("burnley-loop"))
    .add(flindersStreetToSouthernCross(2, false))
    .station(southernCross.point("burnley"))
    .add(southernCrossToFlagstaff(2))
    .station(flagstaff.point("burnley"))
    .add(flagstaffToParliament(2, "burnley"))
    .station(parliament.point("burnley"))
    .add(
      richmondLoopPortal(
        loop.line.burnley,
        loopPortalStraight,
        "burnley-direct",
      ),
    )
    .station(richmond.point("burnley"))
    .curve(defaultRadius, -45)
    .straight(burnleyStraight)
    //.stations([EAST_RICHMOND])
    .station(burnleyInterchange.point("burnley"))
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(glenIrisStraight)
        .curve(defaultRadius, -45)
        .straight(glenWaverleyStraight)
        .terminus(),
      //.stations([HEYINGTON, KOOYONG, TOORONGA, etc.])
      //.terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(camberwellStraight)
    //.stations([HAWTHORN, GLENFERRIE, AUBURN])
    .station(camberwell.point("camberwell"))
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(riversdaleStraight)
        .curve(defaultRadius, 45)
        .straight(alameinStraight)
        .terminus(),
    })
    .straight(laburnumStraight)
    .curve(defaultRadius, 45)
    .straight(ringwoodStraight)
    .station(ringwood.point("ringwood"))
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(belgraveStraight)
        .terminus(),
    })
    .straight(lilydaleStraight)
    .terminus(),
});
