import { PathBuilder } from "../path-builder";

export abstract class PathPieceBuilder {
  abstract build(builder: PathBuilder): void;
}
