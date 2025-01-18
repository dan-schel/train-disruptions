export type InformalPoint = Point | { x: number; y: number };

export type InformalFlexiPoint =
  | FlexiPoint
  | { min: InformalPoint; max: InformalPoint }
  | InformalPoint;

export type InformalFlexiLength =
  | FlexiLength
  | { min: number; max: number }
  | { len: number }
  | number;

export class Point {
  constructor(
    readonly x: number,
    readonly y: number,
  ) {}

  static formalize(point: InformalPoint): Point {
    if (point instanceof Point) {
      return point;
    }
    return new Point(point.x, point.y);
  }
}

export class FlexiPoint {
  constructor(
    readonly min: Point,
    readonly max: Point,
  ) {}

  static formalize(point: InformalFlexiPoint): FlexiPoint {
    if (point instanceof FlexiPoint) {
      return point;
    } else if ("min" in point) {
      return new FlexiPoint(
        Point.formalize(point.min),
        Point.formalize(point.max),
      );
    } else {
      const _point = Point.formalize(point);
      return new FlexiPoint(_point, _point);
    }
  }

  horizontalDistanceTo(other: FlexiPoint): FlexiLength {
    return new FlexiLength(
      Math.abs(this.min.x - other.min.x),
      Math.abs(this.max.x - other.max.x),
    );
  }

  verticalDistanceTo(other: FlexiPoint): FlexiLength {
    return new FlexiLength(
      Math.abs(this.min.y - other.min.y),
      Math.abs(this.max.y - other.max.y),
    );
  }

  amplify(amplification: number): Point {
    return new Point(
      this.min.x + (this.max.x - this.min.x) * amplification,
      this.min.y + (this.max.y - this.min.y) * amplification,
    );
  }

  plus(input: {
    x?: InformalFlexiLength;
    y?: InformalFlexiLength;
  }): FlexiPoint {
    const x = FlexiLength.formalize(input.x ?? 0);
    const y = FlexiLength.formalize(input.y ?? 0);
    return new FlexiPoint(
      new Point(this.min.x + x.min, this.min.y + y.min),
      new Point(this.max.x + x.max, this.max.y + y.max),
    );
  }

  minus(input: {
    x?: InformalFlexiLength;
    y?: InformalFlexiLength;
  }): FlexiPoint {
    const x = FlexiLength.formalize(input.x ?? 0);
    const y = FlexiLength.formalize(input.y ?? 0);
    return new FlexiPoint(
      new Point(this.min.x - x.min, this.min.y - y.min),
      new Point(this.max.x - x.max, this.max.y - y.max),
    );
  }
}

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
}
