import { SegmentBuilderFunction } from "@/scripts/generate-map-geometry/lib/line-builder";
import {
  lineGap,
  long45,
  short45,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** South-west corner of the city loop from Flinders Street to Southern Cross. */
export function flindersStreetToSouthernCross(
  lineNumber: loop.LineNumber,
  curveEnd: boolean,
): SegmentBuilderFunction {
  const flindersStreetPos = loop.pos.flindersStreet(lineNumber);
  const southernCrossPos = loop.pos.southernCross(lineNumber);
  const radius = loop.radius(lineNumber);
  const straight1 = flindersStreetPos
    .horizontalDistanceTo(southernCrossPos)
    .minus(radius);
  const straight2 = southernCrossPos
    .verticalDistanceTo(flindersStreetPos)
    .minus(radius);
  const curveRadius = lineGap.divide(short45);
  const curveHeight = curveRadius.times(long45);

  if (curveEnd) {
    return (builder) =>
      builder
        .straight(straight1)
        .curve(radius, 90)
        .straight(straight2.minus(curveHeight))
        .curve(curveRadius, -45);
  } else {
    return (builder) =>
      builder.straight(straight1).curve(radius, 90).straight(straight2);
  }
}
