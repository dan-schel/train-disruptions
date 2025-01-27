import { groupBy } from "@dan-schel/js-utils";
import { LineBlueprint } from "../blueprint/line-blueprint";
import { Geometry } from "../../../../components/map/renderer/geometry";
import { InterchangeBuilder } from "./interchange-builder";
import { terminusExtents } from "../../../../components/map/renderer/utils";
import { Line } from "../../../../components/map/renderer/line";
import { Terminus } from "../../../../components/map/renderer/terminus";
import { DualViewport } from "../../../../components/map/renderer/dual-viewport";

export class GeometryBuilder {
  constructor() {}

  build(blueprints: LineBlueprint[]): Geometry {
    const paths = blueprints.map((l) => l.build());

    const lines = paths.flatMap((l) =>
      l.paths.map(
        (p) =>
          new Line(
            l.color,
            p.points.map((x) => x.toDualPoint()),
          ),
      ),
    );

    const locatedInterchanges = paths
      .flatMap((l) => l.paths.flatMap((p) => p.locatedInterchanges))
      .sort(
        (a, b) =>
          a.interchangePoint.interchange.station -
          b.interchangePoint.interchange.station,
      );

    const interchanges = groupBy(
      locatedInterchanges,
      (i) => i.interchangePoint.interchange.station,
    ).map(({ items: locations }) => {
      const interchange = locations[0].interchangePoint.interchange;
      return new InterchangeBuilder(interchange, locations).build();
    });

    const termini = paths.flatMap((l) =>
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

    const viewport = this._buildViewport(lines);

    return new Geometry(lines, interchanges, termini, viewport);
  }

  private _buildViewport(lines: Line[]): DualViewport {
    const points = lines.flatMap((l) => l.path);

    // Min amplification
    const lowestMinX = Math.min(...points.map((p) => p.minX));
    const highestMinX = Math.max(...points.map((p) => p.minX));
    const lowestMinY = Math.min(...points.map((p) => p.minY));
    const highestMinY = Math.max(...points.map((p) => p.minY));
    const minViewport = {
      x: (lowestMinX + highestMinX) / 2,
      y: (lowestMinY + highestMinY) / 2,
      w: highestMinX - lowestMinX,
      h: highestMinY - lowestMinY,
    };

    // Max amplification
    const lowestMaxX = Math.min(...points.map((p) => p.maxX));
    const highestMaxX = Math.max(...points.map((p) => p.maxX));
    const lowestMaxY = Math.min(...points.map((p) => p.maxY));
    const highestMaxY = Math.max(...points.map((p) => p.maxY));
    const maxViewport = {
      x: (lowestMaxX + highestMaxX) / 2,
      y: (lowestMaxY + highestMaxY) / 2,
      w: highestMaxX - lowestMaxX,
      h: highestMaxY - lowestMaxY,
    };

    return new DualViewport(minViewport, maxViewport);
  }
}
