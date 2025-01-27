import { PathBuilder } from "../../builder/path-builder";

export abstract class PathBlueprintPiece {
  abstract reverse(): PathBlueprintPiece;

  abstract bake(baker: PathBuilder): void;
}
