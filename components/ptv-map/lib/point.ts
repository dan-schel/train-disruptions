export type InformalPoint = Point | { x: number; y: number };

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
