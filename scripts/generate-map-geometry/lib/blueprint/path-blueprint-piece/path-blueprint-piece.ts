import { PathBaker } from "../../baked/path-baker";

export abstract class PathBlueprintPiece {
  abstract reverse(): PathBlueprintPiece;

  abstract bake(baker: PathBaker): void;
}
