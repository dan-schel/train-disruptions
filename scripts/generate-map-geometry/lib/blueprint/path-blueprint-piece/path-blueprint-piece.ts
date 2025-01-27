import { PathBuilder } from "../../builder/path-builder";

export abstract class PathBlueprintPiece {
  abstract reverse(): PathBlueprintPiece;

  abstract build(builder: PathBuilder): void;
}
