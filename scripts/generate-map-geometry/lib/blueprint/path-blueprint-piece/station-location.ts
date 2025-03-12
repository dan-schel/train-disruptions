import { PathPieceBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/path-piece-builder";
import { StationLocationBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-piece-builder/station-location-builder";
import { InterchangeBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";
import { PathBlueprintPiece } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint-piece/path-blueprint-piece";

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
