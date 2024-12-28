import { describe, expect, it } from "vitest";
import { MongoSortClauseInterpreter } from "../../../../../server/database/lib/mongo/mongo-sort-clause-interpreter";
import { SortClause } from "../../../../../server/database/lib/general/query-types";
import { DatabaseModel } from "../../../../../server/database/lib/general/database-model";

describe("MongoSortClauseInterpreter", () => {
  describe("buildSort", () => {
    function sort(sort: SortClause<DatabaseModel> | undefined) {
      return new MongoSortClauseInterpreter(sort).toMongoSort();
    }

    it("should handle array contains checking", () => {
      expect(sort({ by: "a", direction: "asc" })).toStrictEqual(["a", "asc"]);
      expect(sort({ by: "a", direction: "desc" })).toStrictEqual(["a", "desc"]);
    });

    it("should handle no sorting", () => {
      expect(sort(undefined)).toStrictEqual(undefined);
    });
  });
});
