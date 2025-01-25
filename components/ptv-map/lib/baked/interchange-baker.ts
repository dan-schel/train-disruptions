import { Interchange } from "../interchange";
import { BakedInterchange } from "./baked-geometry";
import { LocatedInterchange } from "./baked-path";

export class InterchangeBaker {
  constructor(readonly interchange: Interchange) {}

  bake(locatedPoints: LocatedInterchange[]): BakedInterchange {
    LocatedInterchange.validate(locatedPoints);

    const points = locatedPoints
      .filter((i) => i.interchangePoint.render)
      .map((i) => i.point);

    // TEMP
    if (points.length === 1) {
      points.push(points[0]);
    }

    return new BakedInterchange(this.interchange.station, [points], null);
  }
}
