import { Geometry } from "@/components/map/renderer/geometry";
import { InterchangeBuilder } from "@/scripts/generate-map-geometry/lib/interchange-builder";
import { Segment } from "@/components/map/renderer/segment";
import { Terminus } from "@/components/map/renderer/terminus";
import {
  DualViewport,
  Viewport,
} from "@/components/map/renderer/dual-viewport";
import { terminusExtents } from "@/scripts/generate-map-geometry/lib/utils";
import { InterchangeBlueprint } from "@/scripts/generate-map-geometry/lib/interchange-blueprint";
import {
  LineBuilder,
  LocatedNode,
} from "@/scripts/generate-map-geometry/lib/line-builder";

export class GeometryBuilder {
  constructor() {}

  build(
    lineBlueprints: LineBuilder[],
    interchangeBlueprints: InterchangeBlueprint[],
    terminiNodeIds: number[],
  ): Geometry {
    const paths = lineBlueprints.map((l) => l.build());
    const segments = paths.flatMap((l) => l.segments);
    const nodes = paths.flatMap((l) => l.nodes);

    const interchanges = this._buildInterchanges(interchangeBlueprints, nodes);
    const termini = this._buildTermini(terminiNodeIds, nodes);
    const viewport = this._buildDualViewport(segments);

    return new Geometry(segments, interchanges, termini, viewport);
  }

  private _buildInterchanges(
    blueprints: InterchangeBlueprint[],
    nodes: LocatedNode[],
  ) {
    return blueprints.map((i) => new InterchangeBuilder(i, nodes).build());
  }

  private _buildTermini(terminiiNodeIds: number[], nodes: LocatedNode[]) {
    return terminiiNodeIds.map((t) => {
      const node = nodes.find((n) => n.nodeId === t);

      if (node == null) throw new Error(`Terminus node "${t}" not found.`);

      return new Terminus(node.color, [
        node.point.move(terminusExtents, node.angle - 90).toDualPoint(),
        node.point.move(terminusExtents, node.angle + 90).toDualPoint(),
      ]);
    });
  }

  private _buildDualViewport(paths: Segment[]): DualViewport {
    const points = paths.flatMap((p) => p.points);
    return new DualViewport(
      this._buildViewport(points.map((p) => ({ x: p.minX, y: p.minY }))),
      this._buildViewport(points.map((p) => ({ x: p.maxX, y: p.maxY }))),
    );
  }

  private _buildViewport(points: { x: number; y: number }[]) {
    const lowestMinX = Math.min(...points.map((p) => p.x));
    const highestMinX = Math.max(...points.map((p) => p.x));
    const lowestMinY = Math.min(...points.map((p) => p.y));
    const highestMinY = Math.max(...points.map((p) => p.y));
    return new Viewport(
      (lowestMinX + highestMinX) / 2,
      (lowestMinY + highestMinY) / 2,
      highestMinX - lowestMinX,
      highestMinY - lowestMinY,
    );
  }
}
