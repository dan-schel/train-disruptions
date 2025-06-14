import React from "react";

import {
  PartialQuestionProps,
  QuestionSetup,
} from "@/components/question/lib/use-question";

export type QuestionGroupValidator<T, Raw> = (
  raw: Raw,
) => { value: T } | { raw: Raw; error: string | null };

export type UseQuestionGroupArgs<T, Raw> = {
  props: PartialQuestionProps<T>;
  setup: QuestionSetup<T, Raw>;
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
