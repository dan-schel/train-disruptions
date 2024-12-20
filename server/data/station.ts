export class Station {
  id: number;
  name: string;
  ptvIDs: number[];

  constructor({ id, name, ptvIDs }: { id: number; name: string; ptvIDs: number[] }) {
    this.id = id;
    this.name = name;
    this.ptvIDs = ptvIDs;
  }
}
