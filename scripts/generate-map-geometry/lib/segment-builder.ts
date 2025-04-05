import { Segment } from "@/components/map/renderer/segment";
import { LineColor } from "@/components/map/renderer/utils";
import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { CurveSegmentInstruction } from "@/scripts/generate-map-geometry/lib/segment-instruction/curve-segment-instruction";
import {
  PointsBuilder,
  SegmentInstruction,
} from "@/scripts/generate-map-geometry/lib/segment-instruction/segment-instruction";
import { StraightSegmentInstruction } from "@/scripts/generate-map-geometry/lib/segment-instruction/straight-segment-instruction";
import { TurnBackSegmentInstruction } from "@/scripts/generate-map-geometry/lib/segment-instruction/turn-back-segment-instruction";

export class SegmentBuilder {
  private _instructions: SegmentInstruction[];

  constructor(
    readonly color: LineColor,
    readonly startPoint: FlexiPoint,
    readonly startAngle: number,
  ) {
    this._instructions = [];
  }

  straight(length: FlexiLength): SegmentBuilder {
    this._instructions.push(new StraightSegmentInstruction(length));
    return this;
  }

  curve(radius: FlexiLength, angle: -90 | -45 | 45 | 90): SegmentBuilder {
    this._instructions.push(new CurveSegmentInstruction(radius, angle));
    return this;
  }

  turnBack(): SegmentBuilder {
    this._instructions.push(new TurnBackSegmentInstruction());
    return this;
  }

  invert(): SegmentBuilder {
    this._instructions.reverse();
    return this;
  }

  build(startNodeId: number, endNodeId: number) {
    const pointsBuilder = new PointsBuilder(this.startPoint, this.startAngle);

    for (const instruction of this._instructions) {
      instruction.build(pointsBuilder);
    }

    return {
      segment: new Segment(
        startNodeId,
        endNodeId,
        this.color,
        pointsBuilder.getPoints(),
      ),
      endPoint: pointsBuilder.getCurrentPoint(),
      endAngle: pointsBuilder.getCurrentAngle(),
    };
  }
}
