import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { Geometry } from "@/components/map/renderer/geometry";
import { InterchangeBuilder } from "@/scripts/generate-map-geometry/lib/builder/interchange-builder";
import { Segment } from "@/components/map/renderer/segment";
import { Terminus } from "@/components/map/renderer/terminus";
import {
  DualViewport,
  Viewport,
} from "@/components/map/renderer/dual-viewport";
import { ColoredPathCollection } from "@/scripts/generate-map-geometry/lib/builder/path";
import { Point } from "@/scripts/generate-map-geometry/lib/dimensions/point";
import { terminusExtents } from "@/scripts/generate-map-geometry/lib/utils";
import { InterchangeBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";

export class GeometryBuilder {
  constructor() {}

  build(
    lineBlueprints: LineBlueprint[],
    interchangeBlueprints: InterchangeBlueprint[],
    terminiiNodeIds: number[],
  ): Geometry {
    const paths = lineBlueprints.map((l) => l.build());

    const lines = this._buildLines(paths);
    const interchanges = this._buildInterchanges(interchangeBlueprints, paths);
    const termini = this._buildTermini(paths, terminiiNodeIds);
    const viewport = this._buildDualViewport(paths);

    return new Geometry(lines, interchanges, termini, viewport);
  }

  private _buildLines(paths: ColoredPathCollection[]) {
    return paths.flatMap((l) =>
      l.paths.map(
        (p) =>
          new Segment(
            null,
            null,
            l.color,
            p.points.map((x) => x.toDualPoint()),
          ),
      ),
    );
  }

  private _buildInterchanges(
    blueprints: InterchangeBlueprint[],
    paths: ColoredPathCollection[],
  ) {
    const allLocatedNodes = paths.flatMap((l) =>
      l.paths.flatMap((p) => p.locatedNodes),
    );

    return blueprints.map((i) =>
      new InterchangeBuilder(i, allLocatedNodes).build(),
    );
  }

  private _buildTermini(
    paths: ColoredPathCollection[],
    terminiiNodeIds: number[],
  ) {
    return terminiiNodeIds.map((t) => {
      for (const path of paths) {
        const node = path.paths
          .flatMap((l) => l.locatedNodes)
          .find((n) => n.nodeId === t);

        if (node == null) continue;

        return new Terminus(path.color, [
          node.point.move(terminusExtents, node.angle - 90).toDualPoint(),
          node.point.move(terminusExtents, node.angle + 90).toDualPoint(),
        ]);
      }
      throw new Error(`Terminus node "${t}" not found.`);
    });
  }

  private _buildDualViewport(paths: ColoredPathCollection[]): DualViewport {
    const points = paths.flatMap((p) => p.paths.flatMap((x) => x.points));
    return new DualViewport(
      this._buildViewport(points.map((p) => p.min)),
      this._buildViewport(points.map((p) => p.max)),
    );
  }

  private _buildViewport(points: Point[]) {
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
