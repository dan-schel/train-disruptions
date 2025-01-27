export class FlexiLength {
  // Note: "min" == the compressed length, "max" == the stretched length. In
  // some rare cases, "max" may be less than "min"!
  constructor(
    readonly min: number,
    readonly max: number,
  ) {}

  plus(other: FlexiLength): FlexiLength {
    return new FlexiLength(this.min + other.min, this.max + other.max);
  }

  minus(other: FlexiLength): FlexiLength {
    return new FlexiLength(this.min - other.min, this.max - other.max);
  }

  times(factor: number): FlexiLength {
    return new FlexiLength(this.min * factor, this.max * factor);
  }

  divide(factor: number): FlexiLength {
    return new FlexiLength(this.min / factor, this.max / factor);
  }
}

export function flexi(min: number, max?: number) {
  return new FlexiLength(min, max ?? min);
}
