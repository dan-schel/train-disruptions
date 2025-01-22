import { LocatedTerminus } from "../baked/baked-path";
import { PathBaker } from "../baked/path-baker";
import { PathPiece } from "./path-piece";

export class Terminus extends PathPiece {
  constructor() {
    super();
  }

  reverse(): PathPiece {
    return this;
  }

  bake(baker: PathBaker): void {
    baker.addTerminus(
      new LocatedTerminus(baker.getCurrentPoint(), baker.getCurrentAngle()),
    );
  }
}
