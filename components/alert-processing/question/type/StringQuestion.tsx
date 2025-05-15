import React from "react";
import {
  QuestionProps,
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
  const { editMode, onEditClick, error, setError } = useQuestion(props);

  const [text, setText] = React.useState<string>(props.value ?? "");

  function handleSubmit() {
    if (props.validate != null) {
      const validationError = props.validate(text);
      if (validationError != null) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    props.onSubmit(text);
  }

  function handleCancel() {}

  if (!editMode) {
    return (
      <SubmittedQuestion
        label={props.label}
        value={props.value ?? "<null>"}
        onEditClick={onEditClick}
      />
    );
  }

  return (
    <ActiveQuestion
      label={props.label}
      onSubmit={handleSubmit}
      error={error}
      isCancelable={true}
      onCancel={handleCancel}
    >
      <Input value={text} onChange={setText} />
    </ActiveQuestion>
  );
}
