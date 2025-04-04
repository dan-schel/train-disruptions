import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { Geometry } from "@/components/map/renderer/geometry";
import { InterchangeBuilder } from "@/scripts/generate-map-geometry/lib/builder/interchange-builder";
import { Line } from "@/components/map/renderer/line";
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
  ): Geometry {
    const paths = lineBlueprints.map((l) => l.build());

    const lines = this._buildLines(paths);
    const interchanges = this._buildInterchanges(interchangeBlueprints, paths);
    const termini = this._buildTermini(paths);
    const viewport = this._buildDualViewport(paths);

    return new Geometry(lines, interchanges, termini, viewport);
  }

  private _buildLines(paths: ColoredPathCollection[]) {
    return paths.flatMap((l) =>
      l.paths.map(
        (p) =>
          new Line(
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

  private _buildTermini(paths: ColoredPathCollection[]) {
    return paths.flatMap((l) =>
      l.paths.flatMap((p) =>
        p.locatedTermini.map((t) => {
          const pointA = t.point
            .move(terminusExtents, t.angle - 90)
            .toDualPoint();
          const pointB = t.point
            .move(terminusExtents, t.angle + 90)
            .toDualPoint();
          return new Terminus(l.color, [pointA, pointB]);
        }),
      ),
    );
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
