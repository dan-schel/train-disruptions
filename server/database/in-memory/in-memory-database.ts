import { Database } from "../database";

class InMemoryDatabaseCollection {
  private readonly values: object[];
  private readonly map: Map<string | number, object>;

  constructor() {
    this.values = [];
    this.map = new Map<string | number, object>();
  }
}

export class InMemoryDatabase extends Database {
  private readonly data: Map<string, InMemoryDatabaseCollection>;

  constructor() {
    super();
    this.data = new Map<string, InMemoryDatabaseCollection>();
  }

  private _collection(name: string) {
    if (this.data.has(name)) {
      return this.data.get(name);
    }

    const collection = new InMemoryDatabaseCollection();
    this.data.set(name, collection);
    return collection;
  }
}
