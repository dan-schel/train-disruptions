import React from "react";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { isAfter } from "date-fns";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { ObjectBuilderQuestion } from "@/components/alert-processing/question/type/complex/object-builder/ObjectBuilderQuestion";
import {
  AnyConfigType,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/types";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";

const config = {
  displayText: {
    type: StringQuestion,
    props: { label: "The disruption ends in..." },
  },
  earliest: {
    type: DateQuestion,
    props: { label: "Earliest interpretable date" },
  },
  latest: {
    type: DateQuestion,
    props: { label: "Latest interpretable date" },
  },
} satisfies AnyConfigType;

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
  props: QuestionProps<EndsApproximatelyInput, null>,
) {
  return (
    <ObjectBuilderQuestion<typeof config>
      {...props}
      props={{ config, validate }}
    />
  );
}
