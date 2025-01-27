import { PathPieceBuilder } from "../../builder/path-piece-builder/path-piece-builder";

export abstract class PathBlueprintPiece {
  abstract reverse(): PathBlueprintPiece;
  abstract getBuilder(): PathPieceBuilder;
}
