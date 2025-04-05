import { lineWidth } from "@/components/map/renderer/utils";
import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { SegmentInstruction } from "@/scripts/generate-map-geometry/lib/segment-instructions";

export const interchangeEdgeOffset = flexi(lineWidth / 2);
export const interchangeInnerOffset = flexi(1);
export const terminusExtents = flexi(5);

export function invert(
  instructions: SegmentInstruction[],
): SegmentInstruction[] {
  const reversed = instructions
    .map((x) => {
      if (x.type !== "curve") return x;

      return {
        ...x,
        angle: -x.angle as -90 | -45 | 45 | 90,
      } as const;
    })
    .reverse();

  return reversed;
}
