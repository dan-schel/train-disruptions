export const lineGap = 5;
export const long45 = Math.cos(Math.PI / 4);
export const short45 = 1 - long45;
export const diagonal = 1 / Math.sqrt(2);
export const defaultRadius = 15;
export const standardDiagonal = 15;

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
