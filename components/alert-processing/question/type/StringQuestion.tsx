import React from "react";
import {
  QuestionProps,
  QuestionSetup,
  QuestionValidator,
  useQuestion,
} from "@/components/alert-processing/question/lib/use-question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { Input } from "@/components/core/Input";

export type StringQuestionAdditionalProps = {
  label: string;
  validate?: (value: string) => string | null;
};

export type StringQuestionProps = QuestionProps<
  string,
  StringQuestionAdditionalProps
>;

export function StringQuestion(props: StringQuestionProps) {
  const validate = React.useCallback<QuestionValidator<string, string>>(
    (raw) => {
      const error = props.props.validate?.(raw);
      if (error != null) return { error };
      return { value: raw };
    },
    [props],
  );

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

const setup: QuestionSetup<string, string> = (input) => {
  return input?.value ?? "";
};
