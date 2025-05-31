import React from "react";

import {
  QuestionInput,
  QuestionProps,
} from "@/components/alert-processing/question/lib/use-question";

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
  const [error, setError] = React.useState<string | null>(null);

  function handleSubquestionSubmit(change: (value: Raw) => Raw) {
    const newRaw = change(raw);
    const result = args.validate(newRaw);

    if ("raw" in result) {
      setRaw(result.raw);
      setError(result.error);
    } else {
      setRaw(newRaw);
      setError(null);
      args.props.onSubmit(result.value);
    }
  }

  return {
    value: raw,
    handleSubquestionSubmit,
    error: error ?? args.props.parentError ?? null,
  };
}
