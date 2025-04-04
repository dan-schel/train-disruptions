import { Interchange } from "@/components/map/renderer/interchange";
import { DualPoint } from "@/components/map/renderer/dual-point";
import {
  InterchangeBlueprint,
  NodePosition,
} from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";
import { LocatedNode } from "@/scripts/generate-map-geometry/lib/builder/path";
import {
  interchangeEdgeOffset,
  interchangeInnerOffset,
} from "@/scripts/generate-map-geometry/lib/utils";

export class InterchangeBuilder {
  constructor(
    private readonly _interchange: InterchangeBlueprint,
    private readonly _allNodeLocations: readonly LocatedNode[],
  ) {
    const missingNode = this._interchange.nodeIds.find((x) =>
      _allNodeLocations.every((l) => l.nodeId !== x),
    );

    if (missingNode != null) {
      throw new Error(`Node "${missingNode}" not found.`);
    }
  }

  build(): Interchange {
    const thickLines = this._interchange.thickLines.map((segment) =>
      segment.map((pos) => this._point(pos)),
    );

    const thinLine =
      this._interchange.thinLine?.map((pos) => this._point(pos)) ?? null;

    return new Interchange(thickLines, thinLine);
  }

  _point(nodePosition: NodePosition): DualPoint {
    const point = this._locateNode(nodePosition.nodeId);

    const offset = {
      "left-edge": { length: interchangeEdgeOffset, angle: -90 },
      "left-inner": { length: interchangeInnerOffset, angle: -90 },
      "right-inner": { length: interchangeInnerOffset, angle: 90 },
      "right-edge": { length: interchangeEdgeOffset, angle: 90 },
    }[nodePosition.position];

    return point.point
      .move(offset.length, point.angle + offset.angle)
      .toDualPoint();
  }

  _locateNode(nodeId: number): LocatedNode {
    const node = this._allNodeLocations.find((x) => x.nodeId === nodeId);

    if (node == null) {
      throw new Error(`Node "${nodeId}" not found.`);
    }

    return node;
  }
}
