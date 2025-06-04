import React from "react";
import { QuestionSetup } from "@/components/alert-processing/question/lib/use-question";
import {
  AnyConfigType,
  ObjectValue,
  RawObjectValue,
} from "@/components/alert-processing/question/type/complex/object-builder/types";

export function useObjectBuilderSetup<Config extends AnyConfigType>(
  config: Config,
) {
  type Type = QuestionSetup<ObjectValue<Config>, RawObjectValue<Config>>;

  return React.useCallback<Type>(
    (input) => {
      // If we actually have an input, we can use it for the raw value (since
      // the raw value follows the same shape, it just allows nulls for each
      // field).
      if (input != null) {
        const entries = Object.entries(input).map(([key, value]) => [
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
