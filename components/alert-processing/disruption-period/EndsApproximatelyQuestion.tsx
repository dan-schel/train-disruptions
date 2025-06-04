import React from "react";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { isAfter } from "date-fns";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { ObjectBuilderQuestion } from "@/components/alert-processing/question/type/complex/object-builder/ObjectBuilderQuestion";
import {
  AnyConfigType,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/types";
import { q } from "@/components/alert-processing/question/type/complex/object-builder/field-builders";

const config = {
  displayText: q.string({
    label: "The disruption ends in...",
  }),
  earliest: q.date({
    label: "Earliest interpretable date",
  }),
  latest: q.date({
    label: "Latest interpretable date",
  }),
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
