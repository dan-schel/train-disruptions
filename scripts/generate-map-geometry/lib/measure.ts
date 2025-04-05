import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { LineBuilder } from "@/scripts/generate-map-geometry/lib/line-builder";
import { SegmentBuilder } from "@/scripts/generate-map-geometry/lib/segment-builder";
import { SegmentInstruction } from "@/scripts/generate-map-geometry/lib/segment-instructions";

export function getNodePosition(line: LineBuilder, nodeId: number): FlexiPoint {
  const locatedNode = line.build().nodes.find((n) => n.nodeId === nodeId);
  if (!locatedNode) {
    throw new Error(`Node ${nodeId} not found`);
  }
  return locatedNode.point;
}

export function getEndPoint(
  startPoint: FlexiPoint,
  startAngle: number,
  instructions: SegmentInstruction[],
): FlexiPoint {
  return new SegmentBuilder(startPoint, startAngle)
    .process(instructions)
    .build().endPoint;
}
