import { ModelResolver } from "../general/database";
import { DatabaseModel, DataOf, IdOf } from "../general/database-model";
import {
  FindQuery,
  FirstQuery,
  CountQuery,
  FieldMatcher,
  FieldConstraint,
  EqualOrNot,
  Comparison,
  Sorting,
} from "../general/query-types";

export class InMemoryModelResolver<
  Model extends DatabaseModel,
> extends ModelResolver<Model> {
  constructor(
    model: Model,
    private readonly _collection: InMemoryDatabaseCollection,
  ) {
    super(model);
  }

  async get(id: IdOf<Model>): Promise<DataOf<Model> | null> {
    const item = this._collection.get(id);
    if (item === null) {
      return null;
    }
    return this._deserialize(item);
  }

  async find(query: FindQuery<Model>): Promise<DataOf<Model>[]> {
    let items = this._collection.find((item) =>
      isMatchingItem(item, query.where ?? {}),
    );
    if (query.sort != null) {
      items.sort(getItemSorter(query.sort));
    }
    if (query.limit != null) {
      items = items.slice(0, query.limit);
    }
    return items.map((item) => this._deserialize(item));
  }

  async first(query: FirstQuery<Model>): Promise<DataOf<Model> | null> {
    const item = this._collection.first((item) =>
      isMatchingItem(item, query.where ?? {}),
    );
    if (item === null) {
      return null;
    }
    return this._deserialize(item);
  }

  async count(query: CountQuery<Model>): Promise<number> {
    return this._collection.count((item) =>
      isMatchingItem(item, query.where ?? {}),
    );
  }

  async create(item: DataOf<Model>): Promise<void> {
    this._collection.create(this._serialize(item));
  }

  async update(item: DataOf<Model>): Promise<void> {
    this._collection.update(this._serialize(item));
  }

  async delete(id: IdOf<Model>): Promise<void> {
    this._collection.delete(id);
  }

  private _serialize(item: DataOf<Model>): InMemoryDatabaseItem {
    return {
      ...this._model.serialize(item),
      id: this._model.getId(item),
    };
  }

  private _deserialize(item: InMemoryDatabaseItem): DataOf<Model> {
    // TODO: [DS] Can we avoid this type assertion?
    return this._model.deserialize(item.id, item) as DataOf<Model>;
  }
}

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

function isMatchingItem(
  item: InMemoryDatabaseItem,
  where: FieldMatcher<DatabaseModel>,
) {
  return Object.entries(where).every(([field, constraint]) => {
    const value = item[field];
    return isMatchingField(constraint!, value);
  });
}

function isMatchingField(field: FieldConstraint, value: unknown) {
  if (field != null && typeof field === "object" && !(field instanceof Date)) {
    if ("length" in field) {
      if (!Array.isArray(value)) {
        return false;
      }
      return field.length === value.length;
    } else if ("contains" in field) {
      if (!Array.isArray(value)) {
        return false;
      }
      return value.includes(field.contains);
    } else if ("notContains" in field) {
      if (!Array.isArray(value)) {
        return false;
      }
      return !value.includes(field.notContains);
    } else {
      return isMatchingComparison(field, value);
    }
  } else {
    return isMatchingComparison(field, value);
  }
}

function isMatchingComparison(
  comparison: EqualOrNot<string | boolean | null> | Comparison<number | Date>,
  value: unknown,
) {
  if (
    comparison == null ||
    typeof comparison !== "object" ||
    comparison instanceof Date
  ) {
    return value === comparison;
  } else if ("not" in comparison) {
    return value !== comparison.not;
  } else {
    if (typeof value !== "number" && !(value instanceof Date)) {
      return false;
    }

    if ("gt" in comparison && !(value > comparison.gt!)) {
      return false;
    }
    if ("gte" in comparison && !(value >= comparison.gt!)) {
      return false;
    }
    if ("lt" in comparison && !(value < comparison.gt!)) {
      return false;
    }
    if ("lte" in comparison && !(value <= comparison.gt!)) {
      return false;
    }
    return true;
  }
}

function getItemSorter(sort: Sorting<DatabaseModel>) {
  return (a: InMemoryDatabaseItem, b: InMemoryDatabaseItem) => {
    const valueA = a[sort.by];
    const valueB = b[sort.by];
    if (typeof valueA === "number" && typeof valueB === "number") {
      return valueA - valueB;
    }
    if (valueA instanceof Date && valueB instanceof Date) {
      return valueA.getTime() - valueB.getTime();
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return valueA.localeCompare(valueB);
    }
    return 0;
  };
}
