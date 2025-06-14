import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";

export function useEnumInitializer<T extends string>() {
  return React.useCallback<QuestionSetup<T, T | null>>((input) => {
    return input?.value ?? null;
  }, []);
}

export function useEnumValidator<T extends string>() {
  return React.useCallback<QuestionValidator<T, T | null>>((raw) => {
    if (raw == null) return { error: "Please choose an option" };
    return { value: raw };
  }, []);
}
