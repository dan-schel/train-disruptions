import { Maybe } from "@/shared/types/maybe";
import React from "react";

export type Submit<T> = (value: T) => void;

export type QuestionProps<T, Extra> = {
  input: Maybe<T>;
  onSubmit: Submit<T>;
  parentError?: string | null;
  props: Extra;
};

export type PartialQuestionProps<T> = {
  input: Maybe<T>;
  onSubmit: Submit<T>;
  parentError?: string | null;
};

export type QuestionSetup<T, State> = (input: Maybe<T>) => State;

export type QuestionValidator<T, State> = (
  raw: State,
) => { value: T } | { error: string };

export type UseQuestionArgs<T, State> = {
  props: PartialQuestionProps<T>;
  setup: QuestionSetup<T, State>;
  validate: QuestionValidator<T, State>;
};

export function useQuestion<T, State>(args: UseQuestionArgs<T, State>) {
  const [state, setState] = React.useState<State>(args.setup(args.props.input));
  const [isEditMode, setEditMode] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function onEditClick() {
    setEditMode(true);
  }

  function onEditCancelClick() {
    setEditMode(false);
    setError(null);
  }

  function handleSubmit() {
    const result = args.validate(state);
    if ("error" in result) {
      setError(result.error);
    } else {
      setError(null);
      args.props.onSubmit(result.value);
      setEditMode(false);
    }
  }

  if (isEditMode || args.props.input == null) {
    return {
      isEditorOpen: true as const,
      isEditMode,
      onEditCancelClick,

      value: state,
      setValue: setState,
      handleSubmit,
      error: error ?? args.props.parentError ?? null,
    };
  } else {
    return {
      isEditorOpen: false as const,
      onEditClick,

      value: args.props.input.value,
      error: args.props.parentError ?? null,
    };
  }
}
