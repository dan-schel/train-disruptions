import { assert, describe, expect, it } from "vitest";
import { disruptionDataBson } from "../../../server/data/disruption/data/disruption-data";
import { disruptionPeriodBson } from "../../../server/data/disruption/period/disruption-period";
import { endsBson } from "../../../server/data/disruption/period/ends/ends";

// NOTE: If this test is breaking, it's probably because you've edited a Zod
// schema which has a "type" field on it which is used to distinguish between
// different implementations of an abstract class.
//
// This test is designed to prevent as adding a new implementation without
// giving it a type field.

describe("Any abstract class serialized to BSON", () => {
  it("should include a type string", () => {
    // If we have more abstract classes which are serialized in this fashion,
    // add them here.
    const schemas = [disruptionDataBson, disruptionPeriodBson, endsBson];

    schemas.forEach((schema) => {
      // Check the schema is a z.union([ ... ]).
      if (schema._def.typeName === "ZodUnion") {
        schema._def.options.forEach((option) => {
          // Get the shape of each option. If it uses .transform() we need to
          // look deeper (it has the "typeName = ZodEffects" in that case).
          const shape =
            option._def.typeName === "ZodEffects"
              ? option._def.schema._def.shape()
              : option._def.shape();

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
