import { PathPieceBuilder } from "../../builder/path-piece-builder/path-piece-builder";
import { StationLocationBuilder } from "../../builder/path-piece-builder/station-location-builder";
import { InterchangeBlueprint } from "../interchange-blueprint";
import { PathBlueprintPiece } from "./path-blueprint-piece";

export class StationLocation extends PathBlueprintPiece {
  constructor(
    readonly id: number,
    readonly interchangePoint: InterchangePoint | null,
  ) {
    super();
  }

  reverse(): PathBlueprintPiece {
    return this;
  }

  getBuilder(): PathPieceBuilder {
    return new StationLocationBuilder(this);
  }
}

export class InterchangePoint<T extends string[] = string[]> {
  constructor(
    readonly interchange: InterchangeBlueprint<T>,
    readonly id: string,
  ) {}
}
