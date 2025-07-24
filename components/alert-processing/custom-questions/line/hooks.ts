import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { parseIntNull } from "@dan-schel/js-utils";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";

export function useLineInitializer() {
  const context = useAlertProcessingContext();

  return React.useCallback<QuestionSetup<number, string>>(
    (input) => {
      const defaultValue = context.lines[0].id.toFixed();
      return input?.value.toFixed() ?? defaultValue;
    },
    [context.lines],
  );
}

export function useLineValidator() {
  const context = useAlertProcessingContext();

  return React.useCallback<QuestionValidator<number, string>>(
    (raw) => {
      const parsed = parseIntNull(raw);
      if (parsed == null || !context.lines.some((l) => l.id === parsed)) {
        return { error: "Not a valid line" };
      }
      return { value: parsed };
    },
    [context],
  );
}
