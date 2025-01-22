import { PathBaker } from "../baked/path-baker";
import { FlexiLength, InformalFlexiLength } from "../dimensions/flexi-length";
import { CurvedPathPiece } from "./curved-path-piece";
import { PathPiece } from "./path-piece";
import { SplitPathPiece } from "./split-path-piece";
import { InterchangePoint, StationLocation } from "./station-location";
import { StraightPathPiece } from "./straight-path-piece";
import { Terminus } from "./terminus";

export class Path {
  readonly pieces: readonly PathPiece[];

  constructor(pieces?: readonly PathPiece[]) {
    this.pieces = pieces ?? [];
  }

  add(piece: PathPiece | Path): Path {
    if (piece instanceof Path) {
      return new Path([...this.pieces, ...piece.pieces]);
    } else {
      return new Path([...this.pieces, piece]);
    }
  }

  bake(baker: PathBaker) {
    for (const piece of this.pieces) {
      piece.bake(baker);
    }
  }

  reverse(): Path {
    return new Path(this.pieces.map((p) => p.reverse()).reverse());
  }

  straight(length: InformalFlexiLength): Path {
    return this.add(new StraightPathPiece(FlexiLength.formalize(length)));
  }

  curve(radius: number, angle: -90 | -45 | 45 | 90): Path {
    return this.add(new CurvedPathPiece(radius, angle));
  }

  split({ split, reverse = false }: { split: Path; reverse?: boolean }): Path {
    return this.add(new SplitPathPiece(split, reverse));
  }

  station(input: number | InterchangePoint) {
    if (input instanceof InterchangePoint) {
      return this.add(new StationLocation(input.interchange.station, input));
    } else {
      return this.add(new StationLocation(input, null));
    }
  }

  terminus() {
    return this.add(new Terminus());
  }
}
