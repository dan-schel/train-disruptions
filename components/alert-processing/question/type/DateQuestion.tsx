import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/alert-processing/question/lib/question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { DateInput } from "@/components/common/DateInput";

export type DateQuestionProps = QuestionProps<Date> & {
  label: string;
  validate?: (value: Date) => string | null;
};

export function DateQuestion(props: DateQuestionProps) {
  const { editMode, onEditClick, onEditCancelClick, error, setError } =
    useQuestion(props);

  const [date, setDate] = React.useState<Date | null>(props.value);

  function handleSubmit() {
    if (date == null) {
      setError("Please select a date.");
      return;
    }

    if (props.validate != null) {
      const validationError = props.validate(date);
      if (validationError != null) {
        setError(validationError);
        return;
      }
    }

    setError(null);
    props.onSubmit(date);
  }

  if (!editMode) {
    return (
      <SubmittedQuestion
        label={props.label}
        value={props.value?.toISOString() ?? "<null>"}
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
      onCancel={onEditCancelClick}
    >
      <DateInput value={date} onChange={setDate} />
    </ActiveQuestion>
  );
}
