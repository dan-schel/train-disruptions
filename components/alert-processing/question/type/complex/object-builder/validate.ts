import React from "react";
import { QuestionGroupValidator } from "@/components/alert-processing/question/lib/use-question-group";
import {
  AnyConfigType,
  ObjectValue,
  RawObjectValue,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/types";

export function useObjectBuilderValidate<Config extends AnyConfigType>(
  validate: ValidateFunction<Config>,
) {
  type Type = QuestionGroupValidator<
    ObjectValue<Config>,
    RawObjectValue<Config>
  >;

  return React.useCallback<Type>(
    (raw) => {
      // If any questions are unanswered (fields are null), do nothing.
      if (Object.values(raw).some((value) => value == null)) {
        return {
          raw: raw,
          error: null,
        };
      }

      // Once all questions are answered, call the validate function passed as
      // props.
      const processed: ObjectValue<Config> = Object.fromEntries(
        Object.entries(raw).map(([key, value]) => [key, value.value]),
      ) as ObjectValue<Config>;

      const error = validate(processed);

      if (error != null) {
        // If the validation fails, clear any requested fields so they can be
        // re-submitted.
        const newRaw = { ...raw };
        for (const key of error.questionsToInvalidate) {
          newRaw[key] = null;
        }

        return {
          raw: newRaw,
          error: error.error,
        };
      }

      // Otherwise if everything's good, declare the value as processed!
      return {
        value: processed,
      };
    },
    [validate],
  );
}
