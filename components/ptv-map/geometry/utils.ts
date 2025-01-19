import { Curve, Path, Split } from "../lib/geometry";

export const lineWidth = 4;
export const lineGap = 5;
export const long45 = Math.cos(Math.PI / 4);
export const short45 = 1 - long45;
export const diagonal = 1 / Math.sqrt(2);

export function measure45CurveLockedDiagonal(
  longLength: number,
  shortLength: number,
  diagonalLength: number,
): { straightLength: number; radius: number } {
  const radius = (shortLength - diagonalLength * diagonal) / short45;
  const straightLength =
    longLength - long45 * radius - diagonalLength * diagonal;

  return { straightLength, radius };
}

export function measure45CurveLockedStraight(
  longLength: number,
  shortLength: number,
  straightLength: number,
): { diagonalLength: number; radius: number } {
  const radius =
    (longLength - shortLength - straightLength) / (long45 - short45);
  const diagonalLength = (shortLength - short45 * radius) / diagonal;
  return { diagonalLength, radius };
}

export function measure45CurveLockedRadius(
  longLength: number,
  shortLength: number,
  radius: number,
): { straightLength: number; diagonalLength: number } {
  const diagonalLength = (shortLength - short45 * radius) / diagonal;
  const straightLength =
    longLength - long45 * radius - diagonalLength * diagonal;
  return { diagonalLength, straightLength };
}

export function reversePath(path: Path[]): Path[] {
  // TODO: [DS] If every path type was a class, they could have a reverse method.
  return path
    .map((segment) => {
      if (segment.type === "curve") {
        const result: Curve = {
          type: "curve",
          radius: segment.radius,
          angle: -segment.angle as -90 | -45 | 45 | 90,
        };
        return result;
      } else if (segment.type === "split") {
        // TODO: [DS] This probably works. Idk. I didn't test it.
        const result: Split = {
          type: "split",
          reverse: !segment.reverse,
          split: reversePath(segment.split),
        };
        return result;
      } else {
        // Straights and interchange markers don't change.
        return segment;
      }
    })
    .reverse();
}
