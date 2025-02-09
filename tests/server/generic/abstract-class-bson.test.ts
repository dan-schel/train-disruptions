import { assert, describe, expect, it } from "vitest";
import { disruptionDataBson } from "../../../server/data/disruption/data/disruption-data";
import { disruptionPeriodBson } from "../../../server/data/disruption/period/disruption-period";
import { endsBson } from "../../../server/data/disruption/period/ends/ends";

// NOTE: If this test is breaking, it's probably because you've edited a Zod
// schema which has a "type" field on it which is used to distinguish between
// different implementations of an abstract class.
//
// This test is designed to prevent us adding a new implementation without
// giving it a type field.

// If we have more abstract classes which are serialized in this fashion,
// add them here.
const schemasToCheck = [disruptionDataBson, disruptionPeriodBson, endsBson];

describe("Any abstract class serialized to BSON", () => {
  it("should include a type string in the schema", () => {
    schemasToCheck.forEach((schema) => {
      // Check the schema is a z.union([ ... ]).
      if (schema._def.typeName === "ZodUnion") {
        schema._def.options.forEach((option) => {
          // Get the shape of each option. Since we always use .transform() we
          // need to look deeper to the z.object({}) within.
          const shape = option._def.schema._def.shape();

          // If some option doesn't use .transform() in the future, change the
          // above to:
          //
          // const shape =
          //   option._def.typeName === "ZodEffects"
          //     ? option._def.schema._def.shape()
          //     : option._def.shape();

          // Check that there's a "type" field which is a z.literal().
          if ("type" in shape) {
            expect(shape.type._def.typeName).toBe("ZodLiteral");
          } else {
            assert.fail(
              `Missing type field in object with keys: ${Object.keys(shape).join(",")}`,
            );
          }
        });
      } else if (schema._def) {
        assert.fail("Schema is not a ZodUnion");
      }
    });
  });
});
