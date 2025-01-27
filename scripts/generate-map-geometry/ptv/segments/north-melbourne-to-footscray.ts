import { flexi } from "../../lib/dimensions/flexi-length";
import { FlexiPoint } from "../../lib/dimensions/flexi-point";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import {
  defaultRadius,
  diagonal,
  lineGap,
  long45,
  measure45CurveLockedDiagonal,
  short45,
} from "../utils";
import { northMelbournePos as northMelbournePosFunc } from "./southern-cross-to-north-melbourne";

const northMelbourneStraight = flexi(10);
const northMelbourneStraightSunbury = flexi(5);
const footscrayStraight = flexi(30);

/** The curves from North Melbourne to Footscray. */
export function northMelbourneToFootscray(
  track: "cross-city" | "regional-rrl" | "sunbury",
): PathBlueprint {
  if (track === "sunbury") {
    const northMelbournePos = northMelbournePosFunc("northern");
    const footscrayPos = footscrayPosFunc("sunbury");

    const longLength = northMelbournePos.horizontalDistanceTo(footscrayPos);
    const shortLength = northMelbournePos.verticalDistanceTo(footscrayPos);
    const { straightLength, radius } = measure45CurveLockedDiagonal(
      longLength,
      shortLength,
      northMelbourneStraightSunbury,
    );

    return new PathBlueprint()
      .straight(northMelbourneStraightSunbury)
      .curve(radius, -45)
      .straight(straightLength);
  } else {
    return new PathBlueprint()
      .straight(northMelbourneStraight)
      .curve(radius(track), -45)
      .straight(footscrayStraight);
  }
}

function radius(track: "cross-city" | "regional-rrl") {
  return track === "cross-city" ? defaultRadius : defaultRadius.plus(lineGap);
}

function footscrayPosFunc(
  track: "cross-city" | "regional-rrl" | "sunbury",
): FlexiPoint {
  const trackNumber = {
    "cross-city": 0,
    "regional-rrl": 1,
    sunbury: 2,
  }[track];

  return northMelbournePosFunc("cross-city")
    .minus({
      x: northMelbourneStraight.times(diagonal),
      y: northMelbourneStraight.times(diagonal),
    })
    .minus({
      x: radius("cross-city").times(long45),
      y: radius("cross-city").times(short45),
    })
    .minus({ x: footscrayStraight })
    .minus({
      y: lineGap.times(trackNumber),
    });
}
