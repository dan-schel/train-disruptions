import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";

export function chooseBoundariesForLine(
  context: AlertProcessingContextData,
  line: number,
) {
  const lineCtx = context.lines.find((l) => l.id === line);
  if (!lineCtx) {
    throw new Error(`Line with id ${line} not found.`);
  }

  return {
    a: lineCtx.lineShapeNodes[0].id,
    b: lineCtx.lineShapeNodes[lineCtx.lineShapeNodes.length - 1].id,
  };
}
