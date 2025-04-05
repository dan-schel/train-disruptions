import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import {
  PointsBuilder,
  SegmentInstruction,
} from "@/scripts/generate-map-geometry/lib/segment-instruction/segment-instruction";

export class StraightSegmentInstruction extends SegmentInstruction {
  constructor(readonly length: FlexiLength) {
    super();
  }

  build(builder: PointsBuilder): void {
    builder.addPoint(
      builder.getCurrentPoint().move(this.length, builder.getCurrentAngle()),
    );
  }
}
