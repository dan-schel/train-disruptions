import React from "react";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";
import {
  QuestionInput,
  QuestionProps,
  update,
  useQuestionStack,
  wrapInput,
} from "@/components/alert-processing/question/lib/question";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";

type RawType = {
  displayText: string | null;
  earliest: Date | null;
  latest: Date | null;
};

export type EndsApproximatelyQuestionProps =
  QuestionProps<EndsApproximatelyInput>;

export function EndsApproximatelyQuestion(
  props: EndsApproximatelyQuestionProps,
) {
  const question = useQuestionStack({ props, setup, validate });

  return (
    <>
      <StringQuestion
        label="The disruption ends in..."
        input={wrapInput(question.value.displayText)}
        onSubmit={update(question.handleSubquestionSubmit, "displayText")}
      />
      {question.value.displayText != null && (
        <DateQuestion
          label="Earliest interpretable date/time"
          input={wrapInput(question.value.earliest)}
          onSubmit={update(question.handleSubquestionSubmit, "earliest")}
        />
      )}
      {question.value.earliest != null && (
        <DateQuestion
          label="Latest interpretable date/time"
          input={wrapInput(question.value.latest)}
          onSubmit={update(question.handleSubquestionSubmit, "latest")}
        />
      )}
    </>
  );
}

function setup(input: QuestionInput<EndsApproximatelyInput>) {
  return {
    displayText: input?.value.displayText ?? null,
    earliest: input?.value.earliest ?? null,
    latest: input?.value.latest ?? null,
  };
}

function validate({ displayText, earliest, latest }: RawType) {
  if (displayText == null) {
    return { error: "No display text entered" };
  }
  if (earliest == null) {
    return { error: "No earliest date entered" };
  }
  if (latest == null) {
    return { error: "No latest date entered" };
  }
  if (latest < earliest) {
    return { error: "Latest date cannot be earlier that earliest date" };
  }

  return { value: { displayText, earliest, latest } };
}
