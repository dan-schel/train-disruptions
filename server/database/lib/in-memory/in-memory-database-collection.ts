export type InMemoryDatabaseItem = {
  id: string | number;
  [key: string]: unknown;
};

export class InMemoryDatabaseCollection {
  private readonly values: InMemoryDatabaseItem[];
  private readonly map: Map<string | number, InMemoryDatabaseItem>;

  constructor() {
    this.values = [];
    this.map = new Map<string | number, InMemoryDatabaseItem>();
  }

  get(id: string | number): InMemoryDatabaseItem | null {
    return this.map.get(id) ?? null;
  }

  find(
    predicate: (x: InMemoryDatabaseItem) => boolean,
  ): InMemoryDatabaseItem[] {
    return this.values.filter(predicate);
  }

  first(
    predicate: (x: InMemoryDatabaseItem) => boolean,
  ): InMemoryDatabaseItem | null {
    return this.values.find(predicate) ?? null;
  }

  count(predicate: (x: InMemoryDatabaseItem) => boolean): number {
    return this.find(predicate).length;
  }

  create(item: InMemoryDatabaseItem): void {
    this.values.push(item);
    this.map.set(item.id, item);
  }

  update(item: InMemoryDatabaseItem): void {
    const index = this.values.findIndex((i) => i.id === item.id);
    if (index === -1) {
      throw new Error("Item not found");
    }
    this.values[index] = item;
    this.map.set(item.id, item);
  }

  delete(id: string | number): void {
    const index = this.values.findIndex((i) => i.id === id);
    if (index === -1) {
      throw new Error("Item not found");
    }
    this.values.splice(index, 1);
    this.map.delete(id);
  }
}
