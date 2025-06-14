import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/alert-processing/question/lib/use-question";

export function useDateInitializer() {
  return React.useCallback<QuestionSetup<Date, Date | null>>((input) => {
    return input?.value ?? null;
  }, []);
}

export function useDateValidator(
  validate: ((value: Date) => string | null) | null,
) {
  return React.useCallback<QuestionValidator<Date, Date | null>>(
    (raw) => {
      if (raw == null) {
        return { error: "No date entered" };
      }

      const error = validate?.(raw);
      if (error != null) return { error };

      return { value: raw };
    },
    [validate],
  );
}
