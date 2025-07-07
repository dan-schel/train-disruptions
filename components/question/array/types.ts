// TODO: In future, maybe we need indicesToInvalidate?
export type ArrayValidateFunction<Type> = (
  input: Type[],
) => { error: string } | null;
