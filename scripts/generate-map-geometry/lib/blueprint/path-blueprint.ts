import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";
import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { Curve } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/curve";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";
import { Split } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/split";
import { Straight } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/straight";
import { Terminus } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/terminus";

export class PathBlueprint {
  readonly pieces: readonly PathBlueprintPiece[];

  constructor(pieces?: readonly PathBlueprintPiece[]) {
    this.pieces = pieces ?? [];
  }

  add(piece: PathBlueprintPiece | PathBlueprint): PathBlueprint {
    if (piece instanceof PathBlueprint) {
      return new PathBlueprint([...this.pieces, ...piece.pieces]);
    } else {
      return new PathBlueprint([...this.pieces, piece]);
    }
  }

  build(builder: PathBuilder) {
    for (const piece of this.pieces) {
      piece.getBuilder().build(builder);
    }
  }

  reverse(): PathBlueprint {
    return new PathBlueprint(this.pieces.map((p) => p.reverse()).reverse());
  }

  straight(length: FlexiLength): PathBlueprint {
    return this.add(new Straight(length));
  }

  curve(radius: FlexiLength, angle: -90 | -45 | 45 | 90): PathBlueprint {
    return this.add(new Curve(radius, angle));
  }

  split({
    split,
    reverse = false,
  }: {
    split: PathBlueprint;
    reverse?: boolean;
  }): PathBlueprint {
    return this.add(new Split(split, reverse));
  }

  terminus() {
    return this.add(new Terminus());
  }

  nodes(nodeIds: number[]) {
    // TODO: [DS] Implement this.
    return this;
  }
}
