import { Field } from "@/components/alert-processing/question/lib/field";
import { Maybe } from "@/shared/types/maybe";

export type QuestionaireProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Field<T, any>;
  input?: T;
  onSubmit: (value: T) => void;
  error?: string | null;
};

export function Questionaire<T>(props: QuestionaireProps<T>) {
  const input: Maybe<T> =
    props.input === undefined ? null : { value: props.input };

  return props.config.getComponent(
    "questionaire",
    input,
    props.onSubmit,
    props.error ?? null,
  );
}
