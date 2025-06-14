import React from "react";
import { QuestionSetup } from "@/components/question/lib/use-question";
import { QuestionGroupValidator } from "@/components/question/lib/use-question-group";
import {
  AnyDiscriminatedUnionConfig,
  RawDiscriminatedUnionValue,
  DiscriminatedUnionValue,
  SemiRawDiscriminatedUnionValue,
} from "@/components/question/discriminated-union/types";

export function useDiscriminatedUnionInitializer<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
>(discriminator: Discriminator) {
  type Value = DiscriminatedUnionValue<Discriminator, Config>;
  type RawValue = RawDiscriminatedUnionValue<Config>;
  type Type = QuestionSetup<Value, RawValue>;

  return React.useCallback<Type>(
    (input) => {
      if (input == null) {
        return { type: null };
      }

      return {
        type: input.value[discriminator],
        value: input.value,
      };
    },
    [discriminator],
  );
}

export function useDiscriminatedUnionValidator<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
>(discriminator: Discriminator) {
  type Value = DiscriminatedUnionValue<Discriminator, Config>;
  type RawValue = RawDiscriminatedUnionValue<Config>;
  type Type = QuestionGroupValidator<Value, RawValue>;

  return React.useCallback<Type>(
    (raw: RawValue) => {
      if (raw.type == null) {
        return {
          raw: raw,
          error: null,
        };
      }

      const semiRaw = raw as SemiRawDiscriminatedUnionValue<Config>;

      if (semiRaw.value == null) {
        return {
          raw: raw,
          error: null,
        };
      }

      return {
        value: {
          [discriminator]: raw.type,
          ...(raw as SemiRawDiscriminatedUnionValue<Config>).value,
        } as Value,
      };
    },
    [discriminator],
  );
}
