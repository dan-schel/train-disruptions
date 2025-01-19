import { FlexiLength, InformalFlexiLength } from "./flexi-length";

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

  straight(length: InformalFlexiLength): Path {
    return this.add(new StraightPathPiece(FlexiLength.formalize(length)));
  }

  curve(radius: number, angle: -90 | -45 | 45 | 90): Path {
    return this.add(new CurvedPathPiece(radius, angle));
  }

  split({ split, reverse = false }: { split: Path; reverse?: boolean }): Path {
    return this.add(new SplitPathPiece(split, reverse));
  }

  interchange(id: number): Path {
    return this.add(new InterchangeMarker(id));
  }

  // TODO: [DS] Does nothing... so far.
  station(id: number) {
    return this;
  }
}

export abstract class PathPiece {}

class StraightPathPiece extends PathPiece {
  constructor(readonly length: FlexiLength) {
    super();
  }
}

class CurvedPathPiece extends PathPiece {
  constructor(
    readonly radius: number,
    readonly angle: -90 | -45 | 45 | 90,
  ) {
    super();
  }
}

class SplitPathPiece extends PathPiece {
  constructor(
    readonly split: Path,
    readonly reverse: boolean,
  ) {
    super();
  }
}

// TODO: [DS] No way to create a split interchange marker, e.g. at Sunshine, so
// far. Maybe that's a case where there's three markers with some sort of index
// and a prop to say which one has the thin line.
class InterchangeMarker extends PathPiece {
  constructor(readonly id: number) {
    super();
  }
}
