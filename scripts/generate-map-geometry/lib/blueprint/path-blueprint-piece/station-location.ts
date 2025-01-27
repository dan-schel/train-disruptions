import { LocatedInterchange } from "../../baked/baked-path";
import { PathBuilder } from "../../builder/path-builder";
import { InterchangeBlueprint } from "../interchange-blueprint";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class StationLocation extends PathBlueprintPiece {
  constructor(
    readonly id: number,
    readonly interchangePoint: InterchangePoint | null,
  ) {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  bake(baker: PathBuilder): void {
    if (this.interchangePoint != null) {
      baker.addInterchange(
        new LocatedInterchange(
          this.interchangePoint,
          baker.getCurrentPoint(),
          baker.getCurrentAngle(),
        ),
      );
    }
  }
}

export class InterchangePoint<T extends string[] = string[]> {
  constructor(
    readonly interchange: InterchangeBlueprint<T>,
    readonly id: string,
  ) {}
}
