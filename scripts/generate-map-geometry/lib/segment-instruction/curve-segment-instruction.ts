import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import {
  PointsBuilder,
  SegmentInstruction,
} from "@/scripts/generate-map-geometry/lib/segment-instruction/segment-instruction";

export class CurveSegmentInstruction extends SegmentInstruction {
  constructor(
    readonly radius: FlexiLength,
    readonly angle: -90 | -45 | 45 | 90,
  ) {
    super();
  }

  build(builder: PointsBuilder): void {
    const segments = this._pointsCount();

    const centerAngle = builder.getCurrentAngle() + (this.angle < 0 ? -90 : 90);
    const center = builder.getCurrentPoint().move(this.radius, centerAngle);

    for (let i = 1; i <= segments; i++) {
      const angle = centerAngle + 180 + (this.angle / segments) * i;
      const point = center.move(this.radius, angle);
      builder.addPoint(point);
    }

    builder.addAngle(this.angle);
  }

  private _pointsCount(): number {
    const factor = Math.abs(this.angle) / 45;
    return 5 * factor;
  }
}
