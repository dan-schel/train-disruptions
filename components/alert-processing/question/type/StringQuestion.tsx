import React from "react";
import {
  QuestionProps,
  useQuestion,
  UseQuestionArgs,
} from "@/components/alert-processing/question/lib/use-question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { Input } from "@/components/core/Input";

type Q = UseQuestionArgs<string, string>;

export type StringQuestionProps = QuestionProps<string> & {
  label: string;
  validate?: (value: string) => string | null;
};

export function StringQuestion(props: StringQuestionProps) {
  const validate = React.useCallback<Q["validate"]>(
    (raw) => {
      const error = props.validate?.(raw);
      if (error != null) return { error };
      return { value: raw };
    },
    [props],
  );

  const question = useQuestion({ props, setup, validate });

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
      wrapInForm={true}
    >
      <Input value={question.value} onChange={question.setValue} />
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.label}
      value={question.value}
      onEditClick={question.onEditClick}
    />
  );
}

const setup: Q["setup"] = (input) => {
  return input?.value ?? "";
};
