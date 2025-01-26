import {
  FlexiLength,
  InformalFlexiLength,
} from "../lib/dimensions/flexi-length";

export const lineGap = 5;
export const long45 = Math.cos(Math.PI / 4);
export const short45 = 1 - long45;
export const diagonal = 1 / Math.sqrt(2);
export const defaultRadius = 15;
export const standardDiagonal = new FlexiLength(5, 15);

export function measure45CurveLockedDiagonal(
  longLength: InformalFlexiLength,
  shortLength: InformalFlexiLength,
  diagonalLength: InformalFlexiLength,
): { straightLength: FlexiLength; radius: FlexiLength } {
  const _longLength = FlexiLength.formalize(longLength);
  const _shortLength = FlexiLength.formalize(shortLength);
  const _diagonalLength = FlexiLength.formalize(diagonalLength);

  const radius = _shortLength
    .minus(_diagonalLength.times(diagonal))
    .divide(short45);

  const straightLength = _longLength
    .minus(radius.times(long45))
    .minus(_diagonalLength.times(diagonal));

  return { straightLength, radius };
}

export function measure45CurveLockedStraight(
  longLength: InformalFlexiLength,
  shortLength: InformalFlexiLength,
  straightLength: InformalFlexiLength,
): { diagonalLength: FlexiLength; radius: FlexiLength } {
  const _longLength = FlexiLength.formalize(longLength);
  const _shortLength = FlexiLength.formalize(shortLength);
  const _straightLength = FlexiLength.formalize(straightLength);

  const radius = _longLength
    .minus(_shortLength)
    .minus(_straightLength)
    .divide(long45 - short45);

  const diagonalLength = _shortLength
    .minus(radius.times(short45))
    .divide(diagonal);

  return { diagonalLength, radius };
}

export function measure45CurveLockedRadius(
  longLength: InformalFlexiLength,
  shortLength: InformalFlexiLength,
  radius: InformalFlexiLength,
): { straightLength: FlexiLength; diagonalLength: FlexiLength } {
  const _longLength = FlexiLength.formalize(longLength);
  const _shortLength = FlexiLength.formalize(shortLength);
  const _radius = FlexiLength.formalize(radius);

  const diagonalLength = _shortLength
    .minus(_radius.times(short45))
    .divide(diagonal);

  const straightLength = _longLength
    .minus(_radius.times(long45))
    .minus(diagonalLength.times(diagonal));

  return { diagonalLength, straightLength };
}
