import { FlexiPoint } from "../../lib/dimensions/flexi-point";
import { Path } from "../../lib/path/path";
import {
  defaultRadius,
  diagonal,
  lineGap,
  long45,
  measure45CurveLockedDiagonal,
  short45,
} from "../utils";
import { northMelbournePos as northMelbournePosFunc } from "./southern-cross-to-north-melbourne";

const northMelbourneStraight = 10;
const footscrayStraight = 30;

export function northMelbourneToFootscray(
  track: "cross-city" | "regional-rrl" | "sunbury",
): Path {
  if (track === "sunbury") {
    const northMelbournePos = northMelbournePosFunc("northern");
    const footscrayPos = footscrayPosFunc("sunbury");

    const longLength = northMelbournePos.horizontalDistanceTo(footscrayPos);
    const shortLength = northMelbournePos.verticalDistanceTo(footscrayPos);
    const { straightLength, radius } = measure45CurveLockedDiagonal(
      longLength,
      shortLength,
      5,
    );

    return new Path().straight(5).curve(radius, -45).straight(straightLength);
  } else {
    return new Path()
      .straight(northMelbourneStraight)
      .curve(radius(track), -45)
      .straight(footscrayStraight);
  }
}

function radius(track: "cross-city" | "regional-rrl") {
  return track === "cross-city" ? defaultRadius : defaultRadius + lineGap;
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
      x: northMelbourneStraight * diagonal,
      y: northMelbourneStraight * diagonal,
    })
    .minus({
      x: radius("cross-city") * long45,
      y: radius("cross-city") * short45,
    })
    .minus({ x: footscrayStraight })
    .minus({
      y: trackNumber * lineGap,
    });
}
