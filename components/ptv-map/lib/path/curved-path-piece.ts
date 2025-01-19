import { PathPiece } from "./path-piece";

export class CurvedPathPiece extends PathPiece {
  constructor(
    readonly radius: number,
    readonly angle: -90 | -45 | 45 | 90,
  ) {
    super();
  }

  reverse(): PathPiece {
    return new CurvedPathPiece(this.radius, -this.angle as -90 | -45 | 45 | 90);
  }
}
