import { PathBaker } from "../baked/path-baker";

export abstract class PathPiece {
  abstract reverse(): PathPiece;

  abstract bake(baker: PathBaker): void;
}
