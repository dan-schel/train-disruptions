import { Curve } from "../../blueprint/path-blueprint-piece/curve";
import { PathBuilder } from "../path-builder";
import { PathPieceBuilder } from "./path-piece-builder";

export class CurveBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: Curve) {
    super();
  }

  build(builder: PathBuilder): void {
    const segments = this._pointsCount();

    const centerAngle =
      builder.getCurrentAngle() + (this._blueprint.angle < 0 ? -90 : 90);
    const center = builder
      .getCurrentPoint()
      .move(this._blueprint.radius, centerAngle);

    for (let i = 1; i <= segments; i++) {
      const angle = centerAngle + 180 + (this._blueprint.angle / segments) * i;
      const point = center.move(this._blueprint.radius, angle);
      builder.addPoint(point);
    }

    builder.addAngle(this._blueprint.angle);
  }

  private _pointsCount(): number {
    const factor = Math.abs(this._blueprint.angle) / 45;
    return 5 * factor;
  }
}
