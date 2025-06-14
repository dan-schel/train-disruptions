import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/alert-processing/question/lib/use-question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import {
  useDateInitializer,
  useDateValidator,
} from "@/components/alert-processing/question/date/hooks";
import { DateInput } from "@/components/common/DateInput";

export type DateQuestionAdditionalProps = {
  label: string;
  validate?: (value: Date) => string | null;
};

export type DateQuestionProps = QuestionProps<
  Date,
  DateQuestionAdditionalProps
>;

export function DateQuestion(props: DateQuestionProps) {
  const setup = useDateInitializer();
  const validate = useDateValidator(props.props.validate ?? null);
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
      <DateInput value={question.value} onChange={question.setValue} />
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      // TODO: [DS] Causes a hydration error if the question is already answered
      // when rendered on the server.
      value={question.value.toLocaleString()}
      onEditClick={question.onEditClick}
    />
  );
}
