import {
  FlexiLength,
  InformalFlexiLength,
} from "../../lib/dimensions/flexi-length";
import { Path } from "../../lib/path/path";
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

  const longLength = parliamentPos.verticalDistanceTo(richmondPos);
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos);
  const diagonalLength = FlexiLength.formalize(portalStraight);

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
