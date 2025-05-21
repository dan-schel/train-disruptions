import React from "react";

// TODO: [DS] Let's just use undefined. It makes everything so much easier!
export type QuestionInput<T> = { value: T } | null;

export type QuestionProps<T> = {
  input: QuestionInput<T>;
  onSubmit: (value: T) => void;
};

export type QuestionValidator<T, Raw> = (
  raw: Raw,
) => { value: T } | { error: string };

export type UseQuestionArgs<T, Raw> = {
  props: QuestionProps<T>;
  setup: (state: QuestionInput<T>) => Raw;
  validate: QuestionValidator<T, Raw>;
};

export function useQuestion<T, Raw>(args: UseQuestionArgs<T, Raw>) {
  const [raw, setRaw] = React.useState<Raw>(args.setup(args.props.input));
  const [isEditMode, setEditMode] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function onEditClick() {
    setEditMode(true);
  }

  function onEditCancelClick() {
    setEditMode(false);
  }

  function handleSubmit() {
    const result = args.validate(raw);
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

      value: raw,
      setValue: setRaw,
      handleSubmit,
      error,
    };
  } else {
    return {
      isEditorOpen: false as const,
      onEditClick,

      value: args.props.input.value,
    };
  }
}
