import React from "react";
import { QuestionSetup } from "@/components/alert-processing/question/lib/use-question";
import {
  ConfigBase,
  RawValueOfConfig,
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";

type Setup<Config extends ConfigBase> = QuestionSetup<
  ValueOfConfig<Config>,
  RawValueOfConfig<Config>
>;

export function useObjectBuilderSetup<Config extends ConfigBase>(
  config: Config,
) {
  return React.useCallback<Setup<Config>>(
    (input) => {
      // If we actually have an input, we can use it for the raw value (since
      // the raw value follows the same shape, it just allows nulls for each
      // field).
      if (input != null) {
        return input.value;
      }

      // Otherwise, construct an object with null for each field in the config.
      return createNullObject(config);
    },
    [config],
  );
}

function createNullObject<Config extends ConfigBase>(
  config: Config,
): RawValueOfConfig<Config> {
  const kvp = Object.keys(config).map((key) => [key, null]);
  return Object.fromEntries(kvp) as RawValueOfConfig<Config>;
}
