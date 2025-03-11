import { DualPoint } from "@/components/map/renderer/dual-point";
import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { Point } from "@/scripts/generate-map-geometry/lib/dimensions/point";

// TODO: I kinda hate that this is just a clone of DualPoint, with some extra
// methods. But the reason it's this way is:
//   - Keeps unnecessary logic (i.e. the distance/plus/minus/etc. methods) out
//     of DualPoint. DualPoint is in the client JS bundle, so I don't want to
//     bloat it with logic that only the script needs.
//   - FlexiLength kinda goes along with this class, but again, only the script
//     needs it.
// Is there a better solution?
export class FlexiPoint {
  constructor(
    readonly min: Point,
    readonly max: Point,
  ) {}

  horizontalDistanceTo(other: FlexiPoint): FlexiLength {
    return new FlexiLength(
      Math.abs(this.min.x - other.min.x),
      Math.abs(this.max.x - other.max.x),
    );
  }

  verticalDistanceTo(other: FlexiPoint): FlexiLength {
    return new FlexiLength(
      Math.abs(this.min.y - other.min.y),
      Math.abs(this.max.y - other.max.y),
    );
  }

  plus(input: { x?: FlexiLength; y?: FlexiLength }): FlexiPoint {
    const x = input.x ?? new FlexiLength(0, 0);
    const y = input.y ?? new FlexiLength(0, 0);
    return new FlexiPoint(
      new Point(this.min.x + x.min, this.min.y + y.min),
      new Point(this.max.x + x.max, this.max.y + y.max),
    );
  }

  minus(input: { x?: FlexiLength; y?: FlexiLength }): FlexiPoint {
    const x = input.x ?? new FlexiLength(0, 0);
    const y = input.y ?? new FlexiLength(0, 0);
    return new FlexiPoint(
      new Point(this.min.x - x.min, this.min.y - y.min),
      new Point(this.max.x - x.max, this.max.y - y.max),
    );
  }

  move(length: FlexiLength, angle: number): FlexiPoint {
    return new FlexiPoint(
      this.min.move(length.min, angle),
      this.max.move(length.max, angle),
    );
  }

  toDualPoint(): DualPoint {
    return new DualPoint(this.min.x, this.min.y, this.max.x, this.max.y);
  }
}

export function fp(min: [number, number], max?: [number, number]): FlexiPoint {
  const second = max ?? min;
  return new FlexiPoint(
    new Point(min[0], min[1]),
    new Point(second[0], second[1]),
  );
}
