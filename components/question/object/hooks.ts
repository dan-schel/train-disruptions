import React from "react";
import { QuestionSetup } from "@/components/question/common/use-question";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
  ObjectValue,
  RawObjectValue,
} from "@/components/question/object/types";
import { QuestionGroupValidator } from "@/components/question/common/use-question-group";

export function useObjectInitializer<Config extends AnyObjectConfig>(
  config: Config,
) {
  type Type = QuestionSetup<ObjectValue<Config>, RawObjectValue<Config>>;

  return React.useCallback<Type>(
    (input) => {
      // If we actually have an input, we can use it for the raw value (since
      // the raw value follows the same shape, it just allows nulls for each
      // field).
      if (input != null) {
        const entries = Object.entries(input.value).map(([key, value]) => [
          key,
          { value: value },
        ]);
        return Object.fromEntries(entries) as RawObjectValue<Config>;
      }

      // Otherwise, construct an object with null for each field in the config.
      const entries = Object.keys(config).map((key) => [key, null]);
      return Object.fromEntries(entries) as RawObjectValue<Config>;
    },
    [config],
  );
}

export function useObjectValidator<Config extends AnyObjectConfig>(
  validate: ObjectValidateFunction<Config>,
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
