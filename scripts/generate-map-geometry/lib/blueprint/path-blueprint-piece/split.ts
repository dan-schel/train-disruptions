import { PathBuilder } from "../../builder/path-builder";
import { PathBlueprint } from "../path-blueprint";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class Split extends PathBlueprintPiece {
  constructor(
    readonly split: PathBlueprint,
    readonly reversed: boolean,
  ) {
    super();
  }

  reverse(): PathBlueprintPiece {
    return new Split(this.split.reverse(), !this.reversed);
  }

  bake(baker: PathBuilder): void {
    baker.subpath((baker) => {
      if (this.reversed) {
        baker.addAngle(180);
      }
      this.split.bake(baker);
    });
  }
}
