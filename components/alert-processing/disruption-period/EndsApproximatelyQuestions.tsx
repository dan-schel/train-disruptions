import React from "react";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";
import {
  QuestionInput,
  QuestionProps,
} from "@/components/alert-processing/question/lib/use-question";
import {
  update,
  wrapInput,
} from "@/components/alert-processing/question/lib/question-group-helpers";
import { EndsApproximatelyInput } from "@/shared/types/alert-processing/disruption-period-input";
import { isAfter } from "date-fns";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";

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
  const question = useQuestionGroup({ props, setup, validate });

  return (
    <>
      <StringQuestion
        label="The disruption ends in..."
        input={wrapInput(question.value.displayText)}
        onSubmit={update(question.handleSubquestionSubmit, "displayText")}
        parentError={question.error}
      />
      {question.value.displayText != null && (
        <DateQuestion
          label="Earliest interpretable date"
          input={wrapInput(question.value.earliest)}
          onSubmit={update(question.handleSubquestionSubmit, "earliest")}
          parentError={question.error}
        />
      )}
      {question.value.earliest != null && (
        <DateQuestion
          label="Latest interpretable date"
          input={wrapInput(question.value.latest)}
          onSubmit={update(question.handleSubquestionSubmit, "latest")}
          parentError={question.error}
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
  if (displayText == null || earliest == null || latest == null) {
    return { raw: { displayText, earliest, latest }, error: null };
  }

  if (!isAfter(latest, earliest)) {
    return {
      raw: { displayText, earliest, latest: null },
      error: "Must be later than the earliest interpretable date",
    };
  }

  return { value: { displayText, earliest, latest } };
}
