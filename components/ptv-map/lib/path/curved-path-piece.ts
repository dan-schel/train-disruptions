import { PathBaker } from "../baked/path-baker";
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
