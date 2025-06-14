import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/lib/use-question";

export function useStringInitializer() {
  return React.useCallback<QuestionSetup<string, string>>((input) => {
    return input?.value ?? "";
  }, []);
}

export function useStringValidator(
  validate: ((value: string) => string | null) | null,
) {
  return React.useCallback<QuestionValidator<string, string>>(
    (raw) => {
      const error = validate?.(raw);
      if (error != null) return { error };
      return { value: raw };
    },
    [validate],
  );
}
