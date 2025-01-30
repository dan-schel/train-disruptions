import { Terminus } from "../../blueprint/path-blueprint-piece/terminus";
import { LocatedTerminus } from "../path";
import { PathBuilder } from "../path-builder";
import { PathPieceBuilder } from "./path-piece-builder";

export class TerminusBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: Terminus) {
    super();
  }

  build(builder: PathBuilder): void {
    builder.addTerminus(
      new LocatedTerminus(builder.getCurrentPoint(), builder.getCurrentAngle()),
    );
  }
}
