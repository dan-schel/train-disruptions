# Querying the database

All database functions require you to have a `Database` instance ([created here](/server/database/init-database.ts)) and the model you wish to query. "Model" is a synonym for "entity", i.e. what relational databases call a "table" or what MongoDB calls "collection". Models will be kept in the [server/database/models](/server/database/models/models.ts) folder.

```ts
import { initDatabase } from "server/database/init-database";
import { CRAYONS } from "server/database/models/models";
import { Crayon } from "server/database/models/crayons";

const db = await initDatabase();
```

Note that we've imported both `CRAYONS` and `Crayon`.

- `CRAYONS` is a constant passed to the `db` object to tell it which model to query.
- `Crayon` is the regular Typescript class we'll be persisting/retrieving objects of ([see code](https://github.com/dan-schel/train-disruptions/blob/d16606c137e4e5e0da660ce7349ffd622b2231b2/server/database/models/crayons.ts)).

(A guide on creating your own database models can be found [here](/docs/database/creating-a-new-database-model.md).)

## Creating a new record

Use `create` to enter a new record into the database:

```ts
const myCrayon = new Crayon("my-red-crayon", "red", 10, []);
await db.of(CRAYONS).create(myCrayon);
```

## Retrieve record by ID

Use `get` to retrieve a record by ID (will return `null` if it doesn't exist):

```ts
const myCrayon: Crayon | null = await db.of(CRAYONS).get("my-red-crayon");
```

Use `require` to throw an error if the record doesn't exist:

```ts
const myCrayon: Crayon = await db.of(CRAYONS).require("my-red-crayon");
```

## Update a record

Use `update` and pass the new record. The existing record with the same ID in the database will be overwritten:

```ts
const myCrayon = new Crayon("my-red-crayon", "red", 8, []);
await db.of(CRAYONS).update(myCrayon);
```

## Delete a record

Use `delete` and pass the ID of the record to delete:

```ts
await db.of(CRAYONS).delete("my-red-crayon");
```

## Counting records

Use `count` to fetch the number of records of this model type:

```ts
const count = await db.of(CRAYONS).count();
```

The `count` method also takes a parameter which can be used to filter out records:

```ts
const count = await db.of(CRAYONS).count({ where: { color: "red" } });
```

(More on this filtering syntax at the [bottom of the page](#syntax-for-where).)

## Searching with conditions

Use `find` to return a list of records matching a filter:

```ts
const results: Crayon[] = await db
  .of(CRAYONS)
  .find({ where: { color: "red" } });
```

Use `first` to return the first record matching a filter (will return `null` if nothing matches):

```ts
const results: Crayon | null = await db
  .of(CRAYONS)
  .first({ where: { color: "red" } });
```

Use `requireFirst` to return the first record matching a filter or throw an error if nothing does:

```ts
const results: Crayon = await db
  .of(CRAYONS)
  .requireFirst({ where: { color: "red" } });
```

Use `requireSingle` to return the record matching a filter, or throw if no records match or multiple records match:

```ts
const results: Crayon = await db
  .of(CRAYONS)
  .requireSingle({ where: { color: "red" } });
```

## Sorting and limits

The `find` method also supports sorting and limiting the number of results:

```ts
const results: Crayon[] = await db.of(CRAYONS).find({
  where: { color: "red" },
  sort: { by: "usesLeft", direction: "desc" },
  limit: 5,
});
```

## Syntax for `where`

### Not equal

```ts
where: {
  color: { not: "red" },
}
```

### Number/date ranges

```ts
where: {
  usesLeft: { gt: 5 },          // Greater than 5.
  usesLeft: { gte: 5 },         // Greater than or equal to 5.
  usesLeft: { lt: 5 },          // Less than 5.
  usesLeft: { lte: 5 },         // Less than or equal to 5.
  usesLeft: { gt: 3, lte: 10 }, // Greater than 3 but less than or equal to 10.
}
```

(These same queries work with dates where `lt` is "earlier than" and `gt` is "later than".)

### Array queries

```ts
where: {
  drawings: { length: 5 },                   // Exactly 5 drawings.
  drawings: { length: { not: 5 } },          // Any amount other than 5 drawings.
  drawings: { length: { gt: 5 } },           // More than 5 drawings.
  drawings: { contains: "Stick figure" },    // "Stick figure" is in the array.
  drawings: { notContains: "Stick figure" }, // "Stick figure" is not in the array.
}
```

## Limitations

- While storing objects with embedded fields is supported, you cannot use `where` or `sort` on embedded fields.
  - For example `where: { name: { first: "Dan" } }` doesn't work.
  - This could be added, but would _take effort_.
  - While MongoDB supports these types of queries, other DB engines (e.g. SQL) don't, so we can probably live without it?
- No ability for multiple sorting tiers, e.g. "sort by year, then by month, then by date".
- No ability to `skip` records (e.g. for pagination) at the moment.
- No ability to `create` records and have the database assign an ID automatically at the moment.
  - This isn't a problem if we use UUIDs, and MongoDB doesn't natively support auto-incrementing IDs anyway.
  - Right now we just represent the UUIDs as strings, which is not very efficient. We can fix this later.

## Why?

Why are we not just using raw MongoDB queries?

My logic for this custom implementation is because we want to support an in-memory database, both because it'll be used for unit tests, and simply means devs don't always need to have MongoDB running. In order to support the in-memory database (which obviously can't support everything MongoDB does), we have a simplified query language that's generic across both.

Apparently it's possible to run MongoDB in memory from an NPM package, so that would've been an alternative, but it probably comes with overhead, idk! This hopefully keeps our unit tests quick and lightweight.

Another thing to consider is the plain MongoDB library for Typescript only gives interfaces to work with as your models, instead of classes. That means we can't define methods, and all the other things that're great about classes.
