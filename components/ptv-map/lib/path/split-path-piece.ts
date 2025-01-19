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
}
