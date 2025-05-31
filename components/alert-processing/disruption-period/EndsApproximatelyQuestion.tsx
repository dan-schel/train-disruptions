import React from "react";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { isAfter } from "date-fns";
import {
  ConfigBase,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { ObjectBuilderQuestion } from "@/components/alert-processing/question/type/complex/object-builder/ObjectBuilderQuestion";

const config = {
  displayText: {
    type: "string",
    props: { label: "The disruption ends in..." },
  },
  earliest: {
    type: "date",
    props: { label: "Earliest interpretable date" },
  },
  latest: {
    type: "date",
    props: { label: "Latest interpretable date" },
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
    <ObjectBuilderQuestion config={config} validate={validate} {...props} />
  );
}
