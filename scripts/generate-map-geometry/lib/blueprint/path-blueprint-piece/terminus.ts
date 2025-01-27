import { PathPieceBuilder } from "../../builder/path-piece-builder/path-piece-builder";
import { TerminusBuilder } from "../../builder/path-piece-builder/terminus-builder";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class Terminus extends PathBlueprintPiece {
  constructor() {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  getBuilder(): PathPieceBuilder {
    return new TerminusBuilder(this);
  }
}
