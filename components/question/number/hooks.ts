import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/lib/use-question";
import { parseFloatNull } from "@dan-schel/js-utils";

export function useNumberInitializer() {
  return React.useCallback<QuestionSetup<number, string>>((input) => {
    return input?.value.toString() ?? "";
  }, []);
}

export function useNumberValidator(
  validate: ((value: number) => string | null) | null,
) {
  return React.useCallback<QuestionValidator<number, string>>(
    (raw) => {
      const parsed = parseFloatNull(raw);
      if (parsed == null) {
        return { error: "Not a valid number" };
      }

      const error = validate?.(parsed);
      if (error != null) return { error };

      return { value: parsed };
    },
    [validate],
  );
}
