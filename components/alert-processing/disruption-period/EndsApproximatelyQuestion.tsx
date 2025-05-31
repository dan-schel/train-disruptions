import React from "react";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { isAfter } from "date-fns";
import { SimpleObjectQuestion } from "@/components/alert-processing/question/type/simple-object/SimpleObjectQuestion";
import {
  ConfigBase,
  ValidateFunction,
} from "@/components/alert-processing/question/type/simple-object/field-types";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";

const config = {
  displayText: {
    type: "string",
    label: "The disruption ends in...",
  },
  earliest: {
    type: "date",
    label: "Earliest interpretable date",
  },
  latest: {
    type: "date",
    label: "Latest interpretable date",
  },
} satisfies ConfigBase;

const validate: ValidateFunction<typeof config> = (input) => {
  if (!isAfter(input.latest, input.earliest)) {
    return {
      error: "Latest date must be after earliest date",
      questionsToInvalidate: ["latest"],
    };
  }

  return null;
};

export function EndsApproximatelyQuestion(
  props: QuestionProps<EndsApproximatelyInput>,
) {
  return (
    <SimpleObjectQuestion
      config={config}
      validate={validate}
      input={props.input}
      onSubmit={props.onSubmit}
    />
  );
}
