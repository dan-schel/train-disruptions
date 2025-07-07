import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { ArrayValidateFunction } from "@/components/question/array/types";
import { Maybe } from "@/shared/types/maybe";
import { nonNull } from "@dan-schel/js-utils";

export function useArrayInitializer<Type>() {
  return React.useCallback<QuestionSetup<Type[], Maybe<Type>[]>>((input) => {
    if (input == null) return [];

    return input.value.map((value) => ({ value }));
  }, []);
}

export function useArrayValidator<Type>(
  validate: ArrayValidateFunction<Type> | null,
) {
  return React.useCallback<QuestionValidator<Type[], Maybe<Type>[]>>(
    (raw) => {
      const completed = raw.filter(nonNull);
      if (completed.length < raw.length) {
        return {
          error: "Cannot proceed until all items are filled.",
        };
      }

      const extracted = completed.map((item) => item.value);
      const error = validate?.(extracted) ?? null;
      if (error != null) {
        return {
          error: error.error,
        };
      }

      return {
        value: extracted,
      };
    },
    [validate],
  );
}
