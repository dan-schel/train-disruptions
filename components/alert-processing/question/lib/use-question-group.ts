import React from "react";

import {
  QuestionInput,
  QuestionProps,
} from "@/components/alert-processing/question/lib/use-question";

// I think it's fine to just use error: string, instead of specifying which
// field is invalid. The error should be shown on ALL fields that are invalid.
// Submitting the subquestion causes validation to run again anyway.
export type QuestionGroupValidator<T, Raw> = (
  raw: Raw,
) => { value: T } | { raw: Raw; error: string | null };

export type UseQuestionGroupArgs<T, Raw> = {
  props: QuestionProps<T>;
  setup: (state: QuestionInput<T>) => Raw;
  validate: QuestionGroupValidator<T, Raw>;
};

export function useQuestionGroup<T, Raw>(args: UseQuestionGroupArgs<T, Raw>) {
  const [raw, setRaw] = React.useState<Raw>(args.setup(args.props.input));

  function handleSubquestionSubmit(change: (value: Raw) => Raw) {
    const newRaw = change(raw);
    const result = args.validate(newRaw);

    if ("raw" in result) {
      setRaw(result.raw);
      // TODO [DS]: Use error for the child question that needs it.
    } else {
      setRaw(newRaw);
      args.props.onSubmit(result.value);
    }
  }

  return {
    value: raw,
    handleSubquestionSubmit,
  };
}
