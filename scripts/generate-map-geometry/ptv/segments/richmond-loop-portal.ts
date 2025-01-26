import { FlexiLength } from "../../lib/dimensions/flexi-length";
import { Path } from "../../lib/path/path";
import { flindersStreet } from "../interchanges";
import { measure45CurveLockedDiagonal } from "../utils";
import * as loop from "../utils-city-loop";
import * as direct from "./flinders-street-to-richmond";

/** The curve from Parliament to Richmond, and the split back to Flinders Street. */
export function richmondLoopPortal(
  lineNumber: loop.LineNumber,
  portalStraight: FlexiLength,
  flindersStreetPoint: (typeof flindersStreet.points)[number],
): Path {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const richmondPos = direct.richmondPos(lineNumber);

  const longLength = parliamentPos.verticalDistanceTo(richmondPos);
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos);

  const { straightLength, radius } = measure45CurveLockedDiagonal(
    longLength,
    shortLength,
    portalStraight,
  );

  return new Path()
    .straight(straightLength)
    .curve(radius, -45)
    .straight(portalStraight)
    .split({
      reverse: true,
      split: direct
        .flindersStreetToRichmond(lineNumber)
        .reverse()
        .station(flindersStreet.point(flindersStreetPoint)),
    });
}
