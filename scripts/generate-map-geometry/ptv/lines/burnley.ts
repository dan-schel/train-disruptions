import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBuilder } from "@/scripts/generate-map-geometry/lib/line-builder";
import { invert } from "@/scripts/generate-map-geometry/lib/utils";
import { flagstaffToMelbourneCentral } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-melbourne-central";
import { flindersStreetToRichmond } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { melbourneCentralToParliament } from "@/scripts/generate-map-geometry/ptv/segments/melbourne-central-to-parliament";
import { parliamentToRichmond } from "@/scripts/generate-map-geometry/ptv/segments/parliament-to-richmond";
import { southernCrossToFlagstaff } from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-flagstaff";
import { defaultRadius } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import { BURNLEY as node } from "@/shared/map-node-ids";

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

const loopLine = loop.line.burnley;

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley = new LineBuilder(
  node.FLINDERS_STREET_LOOP,
  loop.pos.flindersStreet(loopLine),
  180,
  "blue",
)
  .to(node.SOUTHERN_CROSS, flindersStreetToSouthernCross(loopLine, false))
  .to(node.FLAGSTAFF, southernCrossToFlagstaff(loopLine))
  .to(node.MELBOURNE_CENTRAL, flagstaffToMelbourneCentral(loopLine))
  .to(node.PARLIAMENT, melbourneCentralToParliament(loopLine))
  .to(node.RICHMOND, parliamentToRichmond(loopLine, loopPortalStraight))
  .split((l) =>
    l.to(node.FLINDERS_STREET_DIRECT, (s) => {
      // TODO: Doesn't work.
      s.turnBack();
      flagstaffToMelbourneCentral(loopLine)(s)
      s.invert();
    }
  )
  .to(node.BURNLEY, (s) =>
    s.curve(defaultRadius, -45).straight(burnleyStraight),
  )
  .split((l) =>
    l.to(node.GLEN_WAVERLEY, (s) =>
      s
        .curve(defaultRadius, 45)
        .straight(glenIrisStraight)
        .curve(defaultRadius, -45)
        .straight(glenWaverleyStraight),
    ),
  )
  .to(node.CAMBERWELL, (s) =>
    s.curve(defaultRadius, -45).straight(camberwellStraight),
  )
  .split((l) =>
    l.to(node.ALAMEIN, (s) =>
      s
        .curve(defaultRadius, 45)
        .straight(riversdaleStraight)
        .curve(defaultRadius, 45)
        .straight(alameinStraight),
    ),
  )
  .to(node.RINGWOOD, (s) =>
    s
      .straight(laburnumStraight)
      .curve(defaultRadius, 45)
      .straight(ringwoodStraight),
  )
  .split((l) =>
    l.to(node.BELGRAVE, (s) =>
      s.curve(defaultRadius, 45).straight(belgraveStraight),
    ),
  )
  .to(node.LILYDALE, (s) => s.straight(lilydaleStraight));
