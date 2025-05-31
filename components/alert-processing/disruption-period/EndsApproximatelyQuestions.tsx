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

// TODO: [DS] Remove this and use EndsApproximatelyInput, and switch the raw
// type to use dates for earliest/latest.
type BakedType = {
  displayText: string;
  earliest: string;
  latest: string;
};

type RawType = {
  displayText: string | null;
  earliest: string | null;
  latest: string | null;
};

export type EndsApproximatelyQuestionProps = QuestionProps<BakedType>;

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
        <StringQuestion
          label="Some short text"
          input={wrapInput(question.value.earliest)}
          onSubmit={update(question.handleSubquestionSubmit, "earliest")}
          parentError={question.error}
        />
      )}
      {question.value.earliest != null && (
        <StringQuestion
          label="Some long text"
          input={wrapInput(question.value.latest)}
          onSubmit={update(question.handleSubquestionSubmit, "latest")}
          parentError={question.error}
          // Enforce that the latest date is after the earliest date.
          // validate={}
        />
      )}
    </>
  );
}

function setup(input: QuestionInput<BakedType>) {
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

  if (latest.length <= earliest.length) {
    return {
      raw: { displayText, earliest, latest: null },
      error: "Latest string must be longer than the earliest string",
    };
  }

  return { value: { displayText, earliest, latest } };
}
