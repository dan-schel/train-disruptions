import { Field } from "@/components/question/common/field";
import { Maybe } from "@/shared/types/maybe";

export type QuestionnaireProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: Field<T, any>;

  // I consider using undefined instead of Maybe<T> acceptable in this case
  // only, since it's at the highest level and easy to change down the road if
  // need be. It makes the API nicer to use.
  input?: T;

  onSubmit: (value: T) => void;
  error?: string | null;
};

export function Questionnaire<T>(props: QuestionnaireProps<T>) {
  const input: Maybe<T> =
    props.input === undefined ? null : { value: props.input };

  return props.config.getComponent(
    "questionnaire",
    input,
    props.onSubmit,
    props.error ?? null,
  );
}
