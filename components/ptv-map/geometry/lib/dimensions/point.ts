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

  move(length: number, angle: number) {
    return new Point(
      this.x + length * Math.cos(rad(angle)),
      this.y + length * Math.sin(rad(angle)),
    );
  }
}

function rad(deg: number) {
  return deg * (Math.PI / 180);
}
