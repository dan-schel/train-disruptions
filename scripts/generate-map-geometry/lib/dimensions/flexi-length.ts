export type InformalFlexiLength =
  | FlexiLength
  | { min: number; max: number }
  | { len: number }
  | number;

export class FlexiLength {
  constructor(
    readonly min: number,
    readonly max: number,
  ) {
    if (min < 0 || max < 0) {
      throw new Error("Length cannot be negative.");
    }
    if (min > max) {
      throw new Error("Min cannot be less than max.");
    }
  }

  static formalize(length: InformalFlexiLength): FlexiLength {
    if (length instanceof FlexiLength) {
      return length;
    } else if (typeof length === "number") {
      return new FlexiLength(length, length);
    } else if ("len" in length) {
      return new FlexiLength(length.len, length.len);
    } else {
      return new FlexiLength(length.min, length.max);
    }
  }

  plus(other: InformalFlexiLength): FlexiLength {
    const _other = FlexiLength.formalize(other);
    return new FlexiLength(this.min + _other.min, this.max + _other.max);
  }

  minus(other: InformalFlexiLength): FlexiLength {
    const _other = FlexiLength.formalize(other);
    return new FlexiLength(this.min - _other.max, this.max - _other.min);
  }

  times(factor: number): FlexiLength {
    return new FlexiLength(this.min * factor, this.max * factor);
  }
}
