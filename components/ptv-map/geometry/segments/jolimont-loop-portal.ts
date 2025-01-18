import { curve, Path, split, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

const radius = loop.radius(1);

export function jolimontLoopPortal(): Path[] {
  const parliamentPos = loop.parliamentCoords(1);
  const flindersStreetPos = loop.flindersStreetCoords(1);

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
