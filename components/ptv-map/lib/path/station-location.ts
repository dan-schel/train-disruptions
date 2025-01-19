import { LocatedInterchange } from "../baked/baked-path";
import { PathBaker } from "../baked/path-baker";
import { Interchange } from "../interchange";
import { PathPiece } from "./path-piece";

export class StationLocation extends PathPiece {
  constructor(
    readonly id: number,
    readonly interchangePoint: InterchangePoint | null,
  ) {
    super();
  }

  reverse(): PathPiece {
    return this;
  }

  bake(baker: PathBaker): void {
    if (this.interchangePoint != null) {
      baker.addInterchange(
        new LocatedInterchange(this.interchangePoint, baker.getCurrentPoint()),
      );
    }
  }
}

export class InterchangePoint<T extends string[] = string[]> {
  constructor(
    readonly interchange: Interchange<T>,
    readonly id: string,
    readonly render: boolean,
  ) {}
}
