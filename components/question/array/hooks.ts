import React from "react";
import { QuestionSetup } from "@/components/question/common/use-question";
import { QuestionGroupValidator } from "@/components/question/common/use-question-group";
import { ArrayValidateFunction } from "@/components/question/array/types";

export function useArrayInitializer<Type>() {
  return React.useCallback<QuestionSetup<Type[], Type[]>>((input) => {
    if (input != null) {
      return input.value;
    }
    return [];
  }, []);
}

export function useArrayValidator<Type>(
  validate: ArrayValidateFunction<Type> | null,
) {
  return React.useCallback<QuestionGroupValidator<Type[], Type[]>>(
    (raw) => {
      const error = validate?.(raw) ?? null;

      if (error != null) {
        return {
          raw,
          error: error.error,
        };
      }

      return {
        value: raw,
      };
    },
    [validate],
  );
}
