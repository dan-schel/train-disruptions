import { LocatedTerminus } from "../../baked/baked-path";
import { PathBuilder } from "../../builder/path-builder";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class Terminus extends PathBlueprintPiece {
  constructor() {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  bake(baker: PathBuilder): void {
    baker.addTerminus(
      new LocatedTerminus(baker.getCurrentPoint(), baker.getCurrentAngle()),
    );
  }
}
