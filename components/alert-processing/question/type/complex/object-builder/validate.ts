import React from "react";
import { QuestionGroupValidator } from "@/components/alert-processing/question/lib/use-question-group";
import {
  ConfigBase,
  RawValueOfConfig,
  ValidateFunction,
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";

export function useObjectBuilderValidate<Config extends ConfigBase>(
  validate: ValidateFunction<Config>,
) {
  type Type = QuestionGroupValidator<
    ValueOfConfig<Config>,
    RawValueOfConfig<Config>
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
      const error = validate(raw as ValueOfConfig<Config>);

      if (error != null) {
        // If the validation fails, clear any requested fields so they can be
        // re-submitted.
        const newRaw = { ...raw };
        for (const key of error.questionsToInvalidate) {
          newRaw[key] = null;
        }

        return {
          raw: newRaw as RawValueOfConfig<Config>,
          error: error.error,
        };
      }

      // Otherwise if everything's good, declare the value as processed!
      return {
        value: raw as ValueOfConfig<Config>,
      };
    },
    [validate],
  );
}
