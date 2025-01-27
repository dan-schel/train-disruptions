import { StationLocation } from "../../blueprint/path-blueprint-piece/station-location";
import { LocatedInterchange } from "../path";
import { PathBuilder } from "../path-builder";
import { PathPieceBuilder } from "./path-piece-builder";

export class StationLocationBuilder extends PathPieceBuilder {
  constructor(private readonly _blueprint: StationLocation) {
    super();
  }

  build(builder: PathBuilder): void {
    if (this._blueprint.interchangePoint != null) {
      builder.addInterchange(
        new LocatedInterchange(
          this._blueprint.interchangePoint,
          builder.getCurrentPoint(),
          builder.getCurrentAngle(),
        ),
      );
    }
  }
}
