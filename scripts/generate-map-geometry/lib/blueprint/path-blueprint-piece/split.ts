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

  build(builder: PathBuilder): void {
    builder.subpath((builder) => {
      if (this.reversed) {
        builder.addAngle(180);
      }
      this.split.build(builder);
    });
  }
}
