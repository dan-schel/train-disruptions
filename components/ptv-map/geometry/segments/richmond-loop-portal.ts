import { FlexiLength, InformalFlexiLength } from "../../lib/flexi-length";
import { Path } from "../../lib/path";
import { flindersStreet } from "../interchanges";
import { measure45CurveLockedDiagonal } from "../utils";
import * as loop from "../utils-city-loop";
import * as direct from "./flinders-street-to-richmond";

/** The curve from Parliament to Richmond, and the split back to Flinders Street. */
export function richmondLoopPortal(
  lineNumber: loop.LineNumber,
  portalStraight: InformalFlexiLength,
  flindersStreetPoint: (typeof flindersStreet.points)[number],
): Path {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const richmondPos = direct.richmondPos(lineNumber);

  // TODO: [DS] Radius cannot be flexi at the moment (I think enabling to be
  // would be fine), so always use the min. This will break if the city loop
  // ever uses flexi lengths!
  const longLength = parliamentPos.verticalDistanceTo(richmondPos).min;
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos).min;
  const diagonalLength = FlexiLength.formalize(portalStraight).min;

  const { straightLength, radius } = measure45CurveLockedDiagonal(
    longLength,
    shortLength,
    diagonalLength,
  );

  return new Path()
    .straight(straightLength)
    .curve(radius, -45)
    .straight(diagonalLength)
    .split({
      reverse: true,
      split: direct
        .flindersStreetToRichmond(lineNumber)
        .reverse()
        .station(flindersStreet.point(flindersStreetPoint)),
    });
}
