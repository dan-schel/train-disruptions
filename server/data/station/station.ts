import { MapPoint } from "@/server/data/map-point";

export class Station {
  readonly id: number;
  readonly name: string;
  readonly ptvIds: readonly number[];

  readonly mapLocation: MapPoint | null;

  constructor({
    id,
    name,
    ptvIds,
    mapLocation,
  }: {
    id: number;
    name: string;
    ptvIds: readonly number[];
    mapLocation?: MapPoint | null; // TODO: [DS] Optional temporarily.
  }) {
    this.id = id;
    this.name = name;
    this.ptvIds = ptvIds;
    this.mapLocation = mapLocation ?? null;
  }
}
