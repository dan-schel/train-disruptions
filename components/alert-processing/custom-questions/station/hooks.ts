import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { parseIntNull } from "@dan-schel/js-utils";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";

export function useStationInitializer() {
  const context = useAlertProcessingContext();
  const defaultValue = context.stations[0]?.id.toFixed() ?? "";

  return React.useCallback<QuestionSetup<number, string>>(
    (input) => {
      return input?.value.toFixed() ?? defaultValue;
    },
    [defaultValue],
  );
}

export function useStationValidator() {
  const context = useAlertProcessingContext();

  return React.useCallback<QuestionValidator<number, string>>(
    (raw) => {
      const parsed = parseIntNull(raw);
      if (parsed == null || !context.stations.some((l) => l.id === parsed)) {
        return { error: "Not a valid station" };
      }
      return { value: parsed };
    },
    [context],
  );
}
