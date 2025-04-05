import { Segment } from "@/components/map/renderer/segment";
import { LineColor } from "@/components/map/renderer/utils";
import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import {
  CurveSegmentInstruction,
  SegmentInstruction,
  StraightSegmentInstruction,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";

export class SegmentBuilder {
  private _currentPoint: FlexiPoint;
  private _currentAngle: number;
  private _points: FlexiPoint[];

  constructor(startPoint: FlexiPoint, startAngle: number) {
    this._currentPoint = startPoint;
    this._currentAngle = startAngle;
    this._points = [startPoint];
  }

  process(instructions: SegmentInstruction[]): SegmentBuilder {
    for (const instruction of instructions) {
      this._processInstruction(instruction);
    }

    return this;
  }

  build(startNodeId: number, endNodeId: number, color: LineColor) {
    return {
      segment: new Segment(
        startNodeId,
        endNodeId,
        color,
        this._points.map((x) => x.toDualPoint()),
      ),
      endPoint: this._currentPoint,
      endAngle: this._currentAngle,
    };
  }

  private _processInstruction(instruction: SegmentInstruction) {
    switch (instruction.type) {
      case "straight":
        return this._processStraight(instruction);
      case "curve":
        return this._processCurve(instruction);
      case "turnBack":
        return this._processTurnBack();
      default:
        throw new Error(`Unknown instruction: ${JSON.stringify(instruction)}`);
    }
  }

  private _processStraight(instruction: StraightSegmentInstruction) {
    const { length } = instruction;
    const nextPoint = this._currentPoint.move(length, this._currentAngle);
    this._addPoint(nextPoint);
  }

  private _processCurve(instruction: CurveSegmentInstruction) {
    const { radius, angle: totalAngle } = instruction;

    const centerAngle = this._currentAngle + (totalAngle < 0 ? -90 : 90);
    const center = this._currentPoint.move(radius, centerAngle);

    const numOfPoints = (Math.abs(totalAngle) / 45) * 5;
    for (let i = 1; i <= numOfPoints; i++) {
      const angle = centerAngle + 180 + (totalAngle / numOfPoints) * i;
      const point = center.move(radius, angle);
      this._addPoint(point);
    }

    this._currentAngle += totalAngle;
  }

  private _processTurnBack() {
    this._currentAngle += 180;
  }

  private _addPoint(point: FlexiPoint) {
    this._points.push(point);
    this._currentPoint = point;
  }
}
