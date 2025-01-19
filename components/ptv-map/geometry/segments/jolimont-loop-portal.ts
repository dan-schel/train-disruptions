import { curve, Path, split, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** The curve from Parliament to Jolimont, and the split back to Flinders Street. */
export function jolimontLoopPortal(): Path[] {
  const parliamentPos = loop.pos.parliament(loop.line.cliftonHill);
  const flindersStreetPos = loop.pos.flindersStreet(loop.line.cliftonHill);
  const radius = loop.radius(loop.line.cliftonHill);

  return [
    // Parliament
    straight(parliamentPos.verticalDistanceTo(flindersStreetPos).minus(radius)),
    curve({ radius: radius, angle: -90 }),
    split({
      reverse: true,
      split: [
        straight(
          parliamentPos.horizontalDistanceTo(flindersStreetPos).plus(radius),
        ),
        // Flinders Street
      ],
    }),
    curve({ radius: radius, angle: -45 }),
    // Jolimont
  ];
}
