import { FlexiLength, InformalFlexiLength } from "./flexi-length";
import { InformalPoint, Point } from "./point";

export type InformalFlexiPoint =
  | FlexiPoint
  | { min: InformalPoint; max: InformalPoint }
  | InformalPoint;

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
