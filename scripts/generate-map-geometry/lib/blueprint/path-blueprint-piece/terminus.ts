import { LocatedTerminus } from "../../baked/baked-path";
import { PathBaker } from "../../baked/path-baker";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class Terminus extends PathBlueprintPiece {
  constructor() {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  bake(baker: PathBaker): void {
    baker.addTerminus(
      new LocatedTerminus(baker.getCurrentPoint(), baker.getCurrentAngle()),
    );
  }
}
