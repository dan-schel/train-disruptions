import React from "react";
import { NonNull } from "@/shared/types/non-null";

export type QuestionProps<T extends NonNull> = {
  value: T | null;
  onSubmit: (value: T) => void;
  parentError?: string | null;
};

export function useQuestion<T extends NonNull>(props: QuestionProps<T>) {
  const [editMode, setEditMode] = React.useState(props.value === null);
  const [error, setError] = React.useState<string | null>(null);

  function onEditClick() {
    setEditMode(true);
  }

  return { editMode, onEditClick, error, setError };
}

export function useQuestions() {
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);

  function createSubmitHandlerForIndex<T>(
    index: number,
    onSubmit: (value: T) => void,
  ) {
    return (value: T) => {
      onSubmit(value);
      setActiveQuestionIndex(index + 1);
    };
  }

  return { activeQuestionIndex, createSubmitHandlerForIndex };
}
