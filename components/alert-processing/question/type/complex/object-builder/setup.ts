import React from "react";
import { QuestionSetup } from "@/components/alert-processing/question/lib/use-question";
import {
  ConfigBase,
  RawValueOfConfig,
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";

export function useObjectBuilderSetup<Config extends ConfigBase>(
  config: Config,
) {
  type Type = QuestionSetup<ValueOfConfig<Config>, RawValueOfConfig<Config>>;

  return React.useCallback<Type>(
    (input) => {
      // If we actually have an input, we can use it for the raw value (since
      // the raw value follows the same shape, it just allows nulls for each
      // field).
      if (input != null) {
        return input.value;
      }

      // Otherwise, construct an object with null for each field in the config.
      const entries = Object.keys(config).map((key) => [key, null]);
      return Object.fromEntries(entries) as RawValueOfConfig<Config>;
    },
    [config],
  );
}
