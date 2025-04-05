import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  curve,
  SegmentInstruction,
  straight,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";
import { radiusReduction } from "@/scripts/generate-map-geometry/ptv/segments/parliament-to-jolimont";

/** The curve from Jolimont to Flinders Street. */
export function jolimontToFlindersStreet(): SegmentInstruction[] {
  const parliamentPos = loop.pos.parliament(loop.line.cliftonHill);
  const flindersStreetPos = loop.pos.flindersStreet(loop.line.cliftonHill);
  const radius = loop.radius(loop.line.cliftonHill).minus(radiusReduction);

  return [
    curve(radius, 45),
    straight(
      parliamentPos.horizontalDistanceTo(flindersStreetPos).plus(radius),
    ),
  ];
}
