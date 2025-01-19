import { PathBaker } from "../baked/path-baker";
import { Path } from "./path";
import { PathPiece } from "./path-piece";

export class SplitPathPiece extends PathPiece {
  constructor(
    readonly split: Path,
    readonly reversed: boolean,
  ) {
    super();
  }

  reverse(): PathPiece {
    return new SplitPathPiece(this.split.reverse(), !this.reversed);
  }

  bake(baker: PathBaker): void {
    baker.subpath((baker) => {
      if (this.reversed) {
        baker.addAngle(180);
      }
      this.split.bake(baker);
    });
  }
}
