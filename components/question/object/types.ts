import { AnyField, Field } from "@/components/question/lib/field";
import { Maybe } from "@/shared/types/maybe";

export type AnyObjectConfig = { [key: string]: AnyField };

type FieldValue<T extends AnyField> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Field<infer V, any> ? V : never;

export type ObjectValue<Config extends AnyObjectConfig> = {
  [K in keyof Config]: FieldValue<Config[K]>;
};

export type RawObjectValue<Config extends AnyObjectConfig> = {
  [K in keyof Config]: Maybe<FieldValue<Config[K]>>;
};

export type ObjectValidateFunction<Config extends AnyObjectConfig> = (
  input: ObjectValue<Config>,
) => { error: string; questionsToInvalidate: (keyof Config)[] } | null;
