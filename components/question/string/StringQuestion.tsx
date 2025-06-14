import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/common/use-question";
import { SubmittedQuestion } from "@/components/question/common/SubmittedQuestion";
import { ActiveQuestion } from "@/components/question/common/ActiveQuestion";
import { Input } from "@/components/core/Input";
import {
  useStringInitializer,
  useStringValidator,
} from "@/components/question/string/hooks";

export type StringQuestionAdditionalProps = {
  label: string;
  validate?: (value: string) => string | null;
};

export type StringQuestionProps = QuestionProps<
  string,
  StringQuestionAdditionalProps
>;

export function StringQuestion(props: StringQuestionProps) {
  const setup = useStringInitializer();
  const validate = useStringValidator(props.props.validate ?? null);
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
      value={question.value}
      onEditClick={question.onEditClick}
    />
  );
}
