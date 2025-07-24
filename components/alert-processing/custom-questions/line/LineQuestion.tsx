import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/common/use-question";
import { SubmittedQuestion } from "@/components/question/common/SubmittedQuestion";
import { ActiveQuestion } from "@/components/question/common/ActiveQuestion";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";
import {
  useLineInitializer,
  useLineValidator,
} from "@/components/alert-processing/custom-questions/line/hooks";
import { Select } from "@/components/common/Select";

export type LineQuestionAdditionalProps = {
  label: string;
};

export type LineQuestionProps = QuestionProps<
  number,
  LineQuestionAdditionalProps
>;

export function LineQuestion(props: LineQuestionProps) {
  const context = useAlertProcessingContext();

  const setup = useLineInitializer();
  const validate = useLineValidator();
  const question = useQuestion({ props, setup, validate });

  const options = context.lines.map((line) => ({
    value: line.id.toFixed(),
    label: line.name,
  }));

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
      wrapInForm={true}
    >
      <Select
        options={options}
        value={question.value}
        onChange={question.setValue}
      />
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      value={
        context.lines.find((l) => l.id === question.value)?.name.toString() ??
        "Unknown Line"
      }
      onEditClick={question.onEditClick}
    />
  );
}
