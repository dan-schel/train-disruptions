export class Line {
  id: number;
  name: string;
  ptvIds: number[];

  constructor({ id, name, ptvIds }: { id: number; name: string; ptvIds: number[] }) {
    this.id = id;
    this.name = name;
    this.ptvIds = ptvIds;
  }
}
