import { LineBlueprint } from "../../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import { flexi } from "../../lib/dimensions/flexi-length";
import {
  flindersStreet,
  southernCross,
  northMelbourne,
  footscray,
  newport as newportInterchange,
  laverton,
} from "../interchanges";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneToFootscray } from "../segments/north-melbourne-to-footscray";
import { southernCrossToNorthMelbourne } from "../segments/southern-cross-to-north-melbourne";
import { defaultRadius, diagonal } from "../utils";
import * as loop from "../utils-city-loop";

const newportStraight = flexi(40, 80);
const williamstownStraight = flexi(30, 40);
const westonaStraight = flexi(10, 30);
const altonaLoopDiagonals = flexi(20, 30);
const lavertonExpressStraight = westonaStraight.plus(
  altonaLoopDiagonals.times(diagonal).times(2),
);
const werribeeStraight = flexi(25, 50);

/**
 * The Werribee and Williamstown lines, which split from each other at Newport
 * (colored green on the map).
 */
export const newport = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 180,
  color: "green",

  path: new PathBlueprint()
    .station(flindersStreet.point("cross-city-west"))
    .add(flindersStreetToSouthernCross(5, false))
    .station(southernCross.point("cross-city"))
    .add(southernCrossToNorthMelbourne(5))
    .station(northMelbourne.point("cross-city"))
    .add(northMelbourneToFootscray("cross-city"))
    .station(footscray.point("cross-city"))
    .curve(defaultRadius, -45)
    .straight(newportStraight)
    .station(newportInterchange.point("cross-city"))
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, -45)
        .straight(williamstownStraight)
        .terminus(),
    })
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(lavertonExpressStraight)
        .curve(defaultRadius, 45),
    })
    .straight(altonaLoopDiagonals)
    .curve(defaultRadius, 45)
    .straight(westonaStraight)
    .curve(defaultRadius, 45)
    .straight(altonaLoopDiagonals)
    .station(laverton.point("werribee"))
    .straight(werribeeStraight)
    .terminus(),
});
