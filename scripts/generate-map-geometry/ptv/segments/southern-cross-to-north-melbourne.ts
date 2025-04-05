import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import {
  lineGap,
  measure45CurveLockedRadius,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  curve,
  SegmentInstruction,
  straight,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";
import { getEndPoint } from "@/scripts/generate-map-geometry/lib/measure";

const innerRadius = flexi(15);
const loopDirectRadius = flexi(20);
const southernCrossStraight = flexi(30);
const northMelbourneStraight = flexi(10);

/**
 * The direct path from Southern Cross to North Melbourne. Does not include city
 * loop portal or regional line split.
 */
export function southernCrossToNorthMelbourne(
  southernCrossLineNumber: loop.LineNumber,
): SegmentInstruction[] {
  return [
    straight(southernCrossStraight),
    curve(radius(southernCrossLineNumber), -45),
    straight(northMelbourneStraight),
  ];
}

/**
 * The curve from Southern Cross to North Melbourne for the Northern Loop lines.
 */
export function southernCrossToNorthMelbourneNorthernLoop(): SegmentInstruction[] {
  const southernCross = loop.pos.southernCross(loop.line.northern);
  const northMelbourne = northMelbournePos("northern");
  const directLongLength = northMelbourne.verticalDistanceTo(southernCross);
  const directShortLength = northMelbourne.horizontalDistanceTo(southernCross);

  const {
    straightLength: southernCrossStraight,
    diagonalLength: directNorthMelbourneStraight,
  } = measure45CurveLockedRadius(
    directLongLength,
    directShortLength,
    loopDirectRadius,
  );

  return [
    straight(southernCrossStraight),
    curve(loopDirectRadius, -45),
    straight(directNorthMelbourneStraight),
  ];
}

// /**
//  * The direct path from Southern Cross to North Melbourne that the regional
//  * lines use, including the split just before North Melbourne.
//  */
// export function southernCrossToNorthMelbourneRegional(
//   branch: PathBlueprint,
// ): PathBlueprint {
//   const curveRadius = lineGap.divide(short45);
//   const curveHeight = curveRadius.times(long45);

//   const straightLength = southernCrossStraight.minus(curveHeight);

//   const branchSouthernCrossStraight = flexi(10).times(diagonal);
//   const branchNorthMelbourneStraight = flexi(5);

//   return new PathBlueprint()
//     .curve(curveRadius, 45)
//     .straight(straightLength)
//     .node(REGIONAL_WESTERN.NORTH_MELBOURNE_JUNCTION)
//     .split({
//       split: new PathBlueprint()
//         .straight(branchSouthernCrossStraight)
//         .curve(radius(loop.line.regional), -45)
//         .straight(branchNorthMelbourneStraight)
//         .add(branch),
//     })
//     .curve(radius(loop.line.regional), -45)
//     .straight(northMelbourneStraight);
// }

export function northMelbournePos(
  track: "newport" | "regional-rrl" | "regional-seymour" | "northern",
): FlexiPoint {
  const southernCrossLineNumber = {
    newport: loop.line.crossCity,
    "regional-rrl": loop.line.regional,
    "regional-seymour": loop.line.dandenong,
    northern: loop.line.burnley,
  }[track];

  return getEndPoint(
    loop.pos.southernCross(southernCrossLineNumber),
    270,
    southernCrossToNorthMelbourne(southernCrossLineNumber),
  );
}

function radius(lineNumber: loop.LineNumber) {
  return innerRadius.plus(lineGap.times(5 - lineNumber));
}
