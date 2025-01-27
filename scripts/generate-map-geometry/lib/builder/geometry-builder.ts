import { groupBy } from "@dan-schel/js-utils";
import { LineBlueprint } from "../blueprint/line-blueprint";
import { BakedGeometry } from "../../../../components/map/renderer/baked-geometry";
import { InterchangeBuilder } from "./interchange-builder";
import { terminusExtents } from "../../../../components/map/renderer/utils";
import { BakedLine } from "../../../../components/map/renderer/baked-line";
import { BakedTerminus } from "../../../../components/map/renderer/baked-terminus";
import { BakedViewport } from "../../../../components/map/renderer/baked-viewport";

export class GeometryBuilder {
  constructor() {}

  build(lines: LineBlueprint[]): BakedGeometry {
    const bakedPaths = lines.map((l) => l.bake());

    const bakedLines = bakedPaths.flatMap((l) =>
      l.paths.map(
        (p) =>
          new BakedLine(
            l.color,
            p.points.map((x) => x.bake()),
          ),
      ),
    );

    const locatedInterchanges = bakedPaths
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

    const termini = bakedPaths.flatMap((l) =>
      l.paths.flatMap((p) =>
        p.termini.map((t) => {
          const pointA = t.point.move(terminusExtents, t.angle - 90).bake();
          const pointB = t.point.move(terminusExtents, t.angle + 90).bake();
          return new BakedTerminus(l.color, [pointA, pointB]);
        }),
      ),
    );

    const viewport = this._buildViewport(bakedLines);

    return new BakedGeometry(bakedLines, interchanges, termini, viewport);
  }

  private _buildViewport(bakedLines: BakedLine[]): BakedViewport {
    const points = bakedLines.flatMap((l) => l.path);

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

    return new BakedViewport(minViewport, maxViewport);
  }
}
