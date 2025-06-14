import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/lib/use-question";
import { SubmittedQuestion } from "@/components/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/question/lib/ActiveQuestion";
import { Input } from "@/components/core/Input";
import {
  useNumberInitializer,
  useNumberValidator,
} from "@/components/question/number/hooks";

export type NumberQuestionAdditionalProps = {
  label: string;
  validate?: (value: number) => string | null;
};

export type NumberQuestionProps = QuestionProps<
  number,
  NumberQuestionAdditionalProps
>;

export function NumberQuestion(props: NumberQuestionProps) {
  const setup = useNumberInitializer();
  const validate = useNumberValidator(props.props.validate ?? null);
  const question = useQuestion({ props, setup, validate });

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.props.label}
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
      label={props.props.label}
      value={question.value.toString()}
      onEditClick={question.onEditClick}
    />
  );
}
