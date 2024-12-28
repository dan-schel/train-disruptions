import { Db, Filter, MongoClient, ObjectId, Sort, Document } from "mongodb";
import { config } from "../config";
import { DatabaseModel } from "./database-model";
import { Database } from "./database";
import {
  CountQuery,
  FieldMatcher,
  FindQuery,
  Sorting,
  Comparison,
  EqualOrNot,
} from "./query-types";

export class MongoDatabase extends Database {
  private readonly _db: Db;

  private constructor(_client: MongoClient) {
    super();
    this._db = _client.db(config.DATABASE_NAME);
  }

  static async init(connectionString: string): Promise<MongoDatabase> {
    const client = new MongoClient(connectionString);
    await client.connect();
    return new MongoDatabase(client);
  }

  async get<IdType extends string | number, DataType extends object>(
    model: DatabaseModel<IdType, DataType>,
    id: IdType,
  ): Promise<DataType | null> {
    const result = await this._db
      .collection(model.name)
      .findOne({ _id: new ObjectId(id) });

    if (result == null) {
      return null;
    }

    return model.deserialize(result);
  }

  async first<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType | null> {
    const result = await this._db
      .collection(model.name)
      .findOne(MongoDatabase.buildFilter(query.where));

    if (result == null) {
      return null;
    }

    return model.deserialize(result);
  }

  async find<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    query: FindQuery,
  ): Promise<DataType[]> {
    const result = await this._db
      .collection(model.name)
      .find(MongoDatabase.buildFilter(query.where), {
        sort: MongoDatabase.buildSort(query.sort),
        limit: query.limit,
      })
      .toArray();

    return result.map((item) => model.deserialize(item));
  }

  async count(
    model: DatabaseModel<string | number, object>,
    query: CountQuery,
  ): Promise<number> {
    return await this._db
      .collection(model.name)
      .countDocuments(MongoDatabase.buildFilter(query.where));
  }

  async create<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void> {
    await this._db
      .collection(model.name)
      .insertOne(this._serialize(model, item));
  }

  async update<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ): Promise<void> {
    await this._db
      .collection(model.name)
      .updateOne(
        { _id: new ObjectId(model.getId(item)) },
        this._serialize(model, item),
      );
  }

  async delete<IdType extends string | number>(
    model: DatabaseModel<IdType, object>,
    id: IdType,
  ): Promise<void> {
    await this._db.collection(model.name).deleteOne({ _id: new ObjectId(id) });
  }

  private _serialize<DataType extends object>(
    model: DatabaseModel<string | number, DataType>,
    item: DataType,
  ) {
    // TODO: [DS] We override how the model is serialized because MongoDB uses
    // _id for ids. Is there a better way?

    return {
      ...model.serialize(item),
      _id: new ObjectId(model.getId(item)),
    };
  }

  static buildFilter(where: FieldMatcher | undefined): Filter<Document> {
    if (where == null) {
      return {};
    }

    const filter: Filter<Document> = {};
    for (const field in where) {
      filter[field] = MongoDatabase._buildFilterForField(where[field]);
    }
    return filter;
  }

  static buildSort(sort: Sorting | undefined): Sort | undefined {
    if (sort == null) {
      return undefined;
    }

    // TODO: [DS] Implement this!
  }

  private static _buildFilterForField(field: FieldMatcher[string]) {
    if (
      field != null &&
      typeof field === "object" &&
      !(field instanceof Date)
    ) {
      if ("length" in field) {
        return { $size: MongoDatabase._buildFilterForComparison(field.length) };
      } else if ("contains" in field) {
        return { $in: field.contains };
      } else if ("notContains" in field) {
        return { $nin: field.notContains };
      } else {
        return MongoDatabase._buildFilterForComparison(field);
      }
    } else {
      return MongoDatabase._buildFilterForComparison(field);
    }
  }

  private static _buildFilterForComparison(
    comparison: EqualOrNot<string | boolean | null> | Comparison<number | Date>,
  ) {
    if (
      comparison == null ||
      typeof comparison !== "object" ||
      comparison instanceof Date
    ) {
      return comparison;
    } else if ("not" in comparison) {
      return { $ne: comparison.not };
    } else {
      const result: {
        $gt?: number | Date;
        $gte?: number | Date;
        $lt?: number | Date;
        $lte?: number | Date;
      } = {};

      if ("gt" in comparison) {
        result.$gt = comparison.gt;
      }
      if ("gte" in comparison) {
        result.$gte = comparison.gte;
      }
      if ("lt" in comparison) {
        result.$lt = comparison.lt;
      }
      if ("lte" in comparison) {
        result.$lte = comparison.lte;
      }

      return result;
    }
  }
}
