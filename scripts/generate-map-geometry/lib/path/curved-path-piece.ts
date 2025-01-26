import { PathBaker } from "../baked/path-baker";
import { FlexiLength } from "../dimensions/flexi-length";
import { PathPiece } from "./path-piece";

export class CurvedPathPiece extends PathPiece {
  constructor(
    readonly radius: FlexiLength,
    readonly angle: -90 | -45 | 45 | 90,
  ) {
    super();

    if (radius.min < 0 || radius.max < 0) {
      throw new Error("Radius cannot be negative.");
    }
  }

  reverse(): PathPiece {
    return new CurvedPathPiece(this.radius, -this.angle as -90 | -45 | 45 | 90);
  }

  bake(baker: PathBaker): void {
    const segments = this.bakedPointsCount();

    const centerAngle = baker.getCurrentAngle() + (this.angle < 0 ? -90 : 90);
    const center = baker.getCurrentPoint().move(this.radius, centerAngle);

    for (let i = 1; i <= segments; i++) {
      const angle = centerAngle + 180 + (this.angle / segments) * i;
      const point = center.move(this.radius, angle);
      baker.addPoint(point);
    }

    baker.addAngle(this.angle);
  }

  bakedPointsCount(): number {
    const factor = Math.abs(this.angle) / 45;
    return 5 * factor;
  }
}
