import { flexi } from "../../lib/dimensions/flexi-length";
import { Path } from "../../lib/path/path";
import { flindersStreet } from "../interchanges";
import * as loop from "../utils-city-loop";

const radiusReduction = flexi(5);

/** The curve from Parliament to Jolimont, and the split back to Flinders Street. */
export function jolimontLoopPortal(): Path {
  const parliamentPos = loop.pos.parliament(loop.line.cliftonHill);
  const flindersStreetPos = loop.pos.flindersStreet(loop.line.cliftonHill);
  const radius = loop.radius(loop.line.cliftonHill).minus(radiusReduction);

  return new Path()
    .straight(parliamentPos.verticalDistanceTo(flindersStreetPos).minus(radius))
    .curve(radius, -90)
    .split({
      reverse: true,
      split: new Path()
        .straight(
          parliamentPos.horizontalDistanceTo(flindersStreetPos).plus(radius),
        )
        .station(flindersStreet.point("clifton-hill-direct")),
    })
    .curve(radius, -45);
}
