import { DualPoint } from "@/components/map/renderer/dual-point";
import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";

export abstract class SegmentInstruction {
  abstract build(pointsBuilder: PointsBuilder): void;
}

export class PointsBuilder {
  private _currentPoint: FlexiPoint;
  private _currentAngle: number;
  private _points: FlexiPoint[];

  constructor(
    readonly startPoint: FlexiPoint,
    readonly startAngle: number,
  ) {
    this._currentPoint = startPoint;
    this._currentAngle = startAngle;
    this._points = [startPoint];
  }

  getCurrentPoint(): FlexiPoint {
    return this._currentPoint;
  }

  getCurrentAngle(): number {
    return this._currentAngle;
  }

  addPoint(point: FlexiPoint) {
    this._points.push(point);
    this._currentPoint = point;
  }

  addAngle(angle: number) {
    this._currentAngle += angle;
  }

  getPoints(): DualPoint[] {
    return this._points.map((point) => point.toDualPoint());
  }
}
