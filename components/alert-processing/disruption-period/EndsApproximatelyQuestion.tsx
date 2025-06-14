import React from "react";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { isAfter } from "date-fns";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { q } from "@/components/alert-processing/question";
import { ObjectQuestion } from "@/components/alert-processing/question/object/ObjectQuestion";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
} from "@/components/alert-processing/question/object/types";

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
} satisfies AnyObjectConfig;

const validate: ObjectValidateFunction<typeof config> = (input) => {
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
    <ObjectQuestion<typeof config> {...props} props={{ config, validate }} />
  );
}
