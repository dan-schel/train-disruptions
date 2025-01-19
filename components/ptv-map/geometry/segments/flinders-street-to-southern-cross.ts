import { Path } from "../../lib/path";
import { lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

/** South-west corner of the city loop from Flinders Street to Southern Cross. */
export function flindersStreetToSouthernCross(
  lineNumber: loop.LineNumber,
  curveEnd: boolean,
): Path {
  const flindersStreetPos = loop.pos.flindersStreet(lineNumber);
  const southernCrossPos = loop.pos.southernCross(lineNumber);

  const radius = loop.radius(lineNumber);

  const curveRadius = lineGap / short45;
  const curveHeight = curveRadius * long45;

  let result = new Path()
    .straight(
      flindersStreetPos.horizontalDistanceTo(southernCrossPos).minus(radius),
    )
    .curve(radius, 90);

  if (curveEnd) {
    result = result
      .straight(
        southernCrossPos
          .verticalDistanceTo(flindersStreetPos)
          .minus(radius)
          .minus(curveHeight),
      )
      .curve(curveRadius, -45);
  } else {
    result = result.straight(
      southernCrossPos.verticalDistanceTo(flindersStreetPos).minus(radius),
    );
  }

  return result;
}
