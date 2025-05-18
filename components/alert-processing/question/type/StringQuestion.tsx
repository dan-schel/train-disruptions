import React from "react";
import {
  QuestionInput,
  QuestionProps,
  QuestionValidator,
  useQuestion,
} from "@/components/alert-processing/question/lib/question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { Input } from "@/components/core/Input";

export type StringQuestionProps = QuestionProps<string> & {
  label: string;
  validate?: (value: string) => string | null;
};

export function StringQuestion(props: StringQuestionProps) {
  const question = useQuestion({ props, setup, validate: validator(props) });

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
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

function setup(input: QuestionInput<string>) {
  return input?.value ?? "";
}

function validator(
  props: StringQuestionProps,
): QuestionValidator<string, string> {
  return (raw) => {
    const error = props.validate?.(raw);
    if (error != null) return { error };
    return { value: raw };
  };
}
