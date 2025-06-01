/* eslint-disable @typescript-eslint/no-explicit-any */

import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/type/DateQuestion";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/type/StringQuestion";
import { Maybe } from "@/shared/types/maybe";
import React from "react";

export type Field<T, Extra> = {
  type: React.FC<QuestionProps<T, Extra>>;
  props: Extra;
};

export type AnyField =
  | Field<string, StringQuestionAdditionalProps>
  | Field<Date, DateQuestionAdditionalProps>;

export type AnyConfigType = { [key: string]: AnyField };

type FieldValue<T extends Field<any, any>> =
  T extends Field<infer V, any> ? V : never;

export type ObjectValue<C extends AnyConfigType> = {
  [K in keyof C]: FieldValue<C[K]>;
};

export type RawObjectValue<C extends AnyConfigType> = {
  [K in keyof C]: Maybe<FieldValue<C[K]>>;
};

export type ValidateFunction<Config extends AnyConfigType> = (
  input: ObjectValue<Config>,
) => { error: string; questionsToInvalidate: (keyof Config)[] } | null;
