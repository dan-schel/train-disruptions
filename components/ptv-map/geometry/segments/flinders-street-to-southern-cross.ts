import { curve, Path, straight } from "../../lib/geometry";
import { lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

/** South-west corner of the city loop from Flinders Street to Southern Cross. */
export function flindersStreetToSouthernCross(
  lineNumber: loop.LineNumber,
  curveEnd: boolean,
): Path[] {
  const flindersStreetPos = loop.pos.flindersStreet(lineNumber);
  const southernCrossPos = loop.pos.southernCross(lineNumber);

  const radius = loop.radius(lineNumber);

  const curveRadius = lineGap / short45;
  const curveHeight = curveRadius * long45;

  return [
    // Flinders Street
    straight(
      flindersStreetPos.horizontalDistanceTo(southernCrossPos).minus(radius),
    ),
    curve({ radius: radius, angle: 90 }),
    ...(curveEnd
      ? [
          straight(
            southernCrossPos
              .verticalDistanceTo(flindersStreetPos)
              .minus(radius)
              .minus(curveHeight),
          ),
          curve({ radius: curveRadius, angle: -45 }),
        ]
      : [
          straight(
            southernCrossPos
              .verticalDistanceTo(flindersStreetPos)
              .minus(radius),
          ),
        ]),
    // Southern Cross
  ];
}
