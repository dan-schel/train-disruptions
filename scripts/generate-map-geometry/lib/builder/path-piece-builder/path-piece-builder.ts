import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";

export abstract class PathPieceBuilder {
  abstract build(builder: PathBuilder): void;
}
