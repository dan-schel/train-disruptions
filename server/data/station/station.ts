export class Station {
  readonly id: number;
  readonly name: string;
  readonly ptvIds: readonly number[];

  constructor({
    id,
    name,
    ptvIds,
  }: {
    id: number;
    name: string;
    ptvIds: readonly number[];
  }) {
    this.id = id;
    this.name = name;
    this.ptvIds = ptvIds;
  }
}
