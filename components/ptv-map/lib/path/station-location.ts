import { PathPiece } from "./path-piece";

export class StationLocation extends PathPiece {
  constructor(
    readonly id: number,
    readonly interchangePoint: InterchangePoint | null,
  ) {
    super();
  }

  reverse(): PathPiece {
    return this;
  }
}

export class Interchange<T extends string[] = string[]> {
  constructor(
    readonly station: number,
    readonly points: T,
    readonly renderedPoints: T[number][],
  ) {
    // TODO: [DS] Figure out how to represent which points need to be used to
    // draw the interchange, and which points can have a thin line between them.
  }

  point(id: T[number]) {
    return new InterchangePoint(
      this,
      this.renderedPoints.includes(id),
      // this.points[id],
      // this.thinPoints.includes(id),
    );
  }
}

export class InterchangePoint<T extends string[] = string[]> {
  constructor(
    readonly interchange: Interchange<T>,
    readonly render: boolean,
  ) {}
}
