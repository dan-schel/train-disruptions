import { groupBy } from "@dan-schel/js-utils";
import { Line } from "../line";
import { BakedGeometry, BakedLine, BakedTerminus } from "../../baked-geometry";
import { InterchangeBaker } from "./interchange-baker";
import { terminusExtents } from "../../utils";

export function bake(lines: Line[]): BakedGeometry {
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
    return new InterchangeBaker(interchange, locations).bake();
  });

  const terminii = bakedPaths.flatMap((l) =>
    l.paths.flatMap((p) =>
      p.terminii.map((t) => {
        const pointA = t.point.move(terminusExtents, t.angle - 90).bake();
        const pointB = t.point.move(terminusExtents, t.angle + 90).bake();
        return new BakedTerminus(pointA, pointB, l.color);
      }),
    ),
  );

  return new BakedGeometry(bakedLines, interchanges, terminii);
}
