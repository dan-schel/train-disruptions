/* eslint-disable @typescript-eslint/no-explicit-any */

import { Field } from "@/components/alert-processing/question/lib/field";
import { Maybe } from "@/shared/types/maybe";

export type AnyField = Field<any, any>;

export type AnyConfigType = { [key: string]: AnyField };

type FieldValue<T extends Field<any, any>> =
  T extends Field<infer V, any> ? V : never;

export type ObjectValue<C extends AnyConfigType> = {
  [K in keyof C]: FieldValue<C[K]>;
};

export type RawObjectValue<C extends AnyConfigType> = {
  [K in keyof C]: Maybe<FieldValue<C[K]>>;
};

export type ObjectValidateFunction<Config extends AnyConfigType> = (
  input: ObjectValue<Config>,
) => { error: string; questionsToInvalidate: (keyof Config)[] } | null;
