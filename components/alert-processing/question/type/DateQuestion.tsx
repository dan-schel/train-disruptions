import React from "react";
import {
  QuestionInput,
  QuestionProps,
  QuestionValidator,
  useQuestion,
} from "@/components/alert-processing/question/lib/use-question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { DateInput } from "@/components/common/DateInput";

export type DateQuestionProps = QuestionProps<Date> & {
  label: string;
  validate?: (value: Date) => string | null;
};

export function DateQuestion(props: DateQuestionProps) {
  const question = useQuestion({ props, setup, validate: validator(props) });

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
    >
      <DateInput value={question.value} onChange={question.setValue} />
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.label}
      value={question.value.toISOString()}
      onEditClick={question.onEditClick}
    />
  );
}

function setup(input: QuestionInput<Date>) {
  return input?.value ?? null;
}

function validator(
  props: DateQuestionProps,
): QuestionValidator<Date, Date | null> {
  return (raw) => {
    if (raw == null) {
      return { error: "No date entered" };
    }

    const error = props.validate?.(raw);
    if (error != null) return { error };

    return { value: raw };
  };
}
