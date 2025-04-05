import {
  PointsBuilder,
  SegmentInstruction,
} from "@/scripts/generate-map-geometry/lib/segment-instruction/segment-instruction";

export class TurnBackSegmentInstruction extends SegmentInstruction {
  build(builder: PointsBuilder): void {
    builder.addAngle(180);
  }
}
