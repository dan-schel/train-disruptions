import { PathPieceBuilder } from "../../builder/path-piece-builder/path-piece-builder";
import { SplitBuilder } from "../../builder/path-piece-builder/split-builder";
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

  getBuilder(): PathPieceBuilder {
    return new SplitBuilder(this);
  }
}
