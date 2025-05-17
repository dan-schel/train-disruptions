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

  function onEditCancelClick() {
    setEditMode(false);
  }

  return { editMode, onEditClick, onEditCancelClick, error, setError };
}
