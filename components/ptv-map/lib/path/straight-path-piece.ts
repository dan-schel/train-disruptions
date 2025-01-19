import { FlexiLength } from "../flexi-length";
import { PathPiece } from "./path-piece";

export class StraightPathPiece extends PathPiece {
  constructor(readonly length: FlexiLength) {
    super();
  }

  reverse(): PathPiece {
    return this;
  }
}
