import { NodeLocation } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/node-location";
import { LocatedNode } from "@/scripts/generate-map-geometry/lib/builder/path";
import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";
import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";

export class NodeLocationBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: NodeLocation) {
    super();
  }

  build(builder: PathBuilder): void {
    builder.addNode(
      new LocatedNode(
        this._blueprint.nodeId,
        builder.getCurrentPoint(),
        builder.getCurrentAngle(),
      ),
    );
  }
}
