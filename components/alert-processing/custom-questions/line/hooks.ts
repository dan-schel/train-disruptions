import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";
import { parseIntNull } from "@dan-schel/js-utils";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";

export function useLineInitializer() {
  const context = useAlertProcessingContext();

  // TODO: [DS] Use the alert processing context and use the first line as the
  // default?
  return React.useCallback<QuestionSetup<number, string>>(
    (input) => {
      return input?.value.toFixed() ?? context.lines[0]?.id.toFixed() ?? "";
    },
    [context],
  );
}

export function useLineValidator(context: AlertProcessingContextData) {
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
