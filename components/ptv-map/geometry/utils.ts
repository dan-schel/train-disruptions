export const lineWidth = 4;
export const lineGap = 5;
export const long45 = Math.cos(Math.PI / 4);
export const short45 = 1 - long45;
export const diagonal = 1 / Math.sqrt(2);

export function measure45Curve(
  longLength: number,
  shortLength: number,
  diagonalLength: number,
): { straightLength: number; radius: number } {
  const radius = (shortLength - diagonalLength * diagonal) / short45;
  const straightLength =
    longLength - long45 * radius - diagonalLength * diagonal;

  return { straightLength, radius };
}
