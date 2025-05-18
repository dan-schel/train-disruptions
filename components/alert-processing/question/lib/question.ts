import React from "react";

export type QuestionInput<T> = { value: T } | null;

export type QuestionProps<T> = {
  input: QuestionInput<T>;
  onSubmit: (value: T) => void;
};

export type QuestionValidator<T, Raw> = (
  raw: Raw,
) => { value: T } | { error: string };

export type QuestionHookArgs<T, Raw> = {
  props: QuestionProps<T>;
  setup: (state: QuestionInput<T>) => Raw;
  validate: QuestionValidator<T, Raw>;
};

function useQuestionBase<T, Raw>(
  args: QuestionHookArgs<T, Raw> & { onSuccessfulSubmit?: () => void },
) {
  const [raw, setRaw] = React.useState<Raw>(args.setup(args.props.input));
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit() {
    const result = args.validate(raw);
    if ("error" in result) {
      setError(result.error);
    } else {
      setError(null);
      args.props.onSubmit(result.value);
      args.onSuccessfulSubmit?.();
    }
  }

  return { raw, setRaw, error, handleSubmit };
}

export function useQuestion<T, Raw>(args: QuestionHookArgs<T, Raw>) {
  const [isEditMode, setEditMode] = React.useState(false);

  const { raw, setRaw, error, handleSubmit } = useQuestionBase({
    ...args,
    onSuccessfulSubmit: () => {
      setEditMode(false);
    },
  });

  function onEditClick() {
    setEditMode(true);
  }

  function onEditCancelClick() {
    setEditMode(false);
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
      value: args.props.input.value,
      onEditClick,
    };
  }
}

export function useQuestionStack<T, Raw>(args: QuestionHookArgs<T, Raw>) {
  const { raw, setRaw, error, handleSubmit } = useQuestionBase(args);

  function handleSubquestionSubmit(change: (value: Raw) => Raw) {
    setRaw(change);
    handleSubmit();
  }

  // TODO: [DS] Question stacks shouldn't have a way of setting errors, instead
  // they need a way to invalidate questions in the stack.
  // Therefore their validate function will be completely different.

  return {
    value: raw,
    setValue: setRaw,
    handleSubquestionSubmit,
    error,
  };
}

export function wrapInput<T>(input: T | null): QuestionInput<T> {
  return input == null ? null : { value: input };
}

export function update<Raw extends object, Key extends keyof Raw>(
  handleSubquestionSubmit: (change: (value: Raw) => Raw) => void,
  key: Key,
) {
  return (raw: Raw[Key]) => {
    handleSubquestionSubmit((existingValue) => ({
      ...existingValue,
      [key]: raw,
    }));
  };
}
