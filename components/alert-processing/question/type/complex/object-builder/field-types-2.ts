/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";

type Maybe<T> = { value: T } | null;
type Submit<T> = (value: T) => void;

type QuestionProps<T, Extra> = {
  input: Maybe<T>;
  onSubmit: Submit<T>;
  parentError?: string | null;
  props: Extra;
};

type QuestionComponent<T, Extra> = React.FC<QuestionProps<T, Extra>>;

type Field<T, Extra> = {
  type: QuestionComponent<T, Extra>;
  props: Extra;
};

type FieldValue<T extends Field<any, any>> =
  T extends Field<infer V, any> ? V : never;

type AdditionalProps<T extends QuestionComponent<any, any>> =
  T extends QuestionComponent<any, infer E> ? E : never;

type KnownFieldTypes =
  | Field<string, { label: string }>
  | Field<number, { suffix: string }>
  | Field<boolean, { format: "true-false" | "yes-no" }>;

type AnyConfigType = { [key: string]: KnownFieldTypes };

type ObjectValue<C extends AnyConfigType> = {
  [K in keyof C]: FieldValue<C[K]>;
};

type RawObjectValue<C extends AnyConfigType> = {
  [K in keyof C]: Maybe<FieldValue<C[K]>>;
};

// ----------- EXAMPLE -----------

type StringQuestionComponent = QuestionComponent<string, { label: string }>;
const StringQuestion: StringQuestionComponent = ({ props }) => props.label;

// prettier-ignore
type BooleanQuestionComponent = QuestionComponent<boolean, { format: "true-false" | "yes-no" }>;
const BooleanQuestion: BooleanQuestionComponent = ({ props }) => props.format;

// prettier-ignore
type ComplexQuestionComponent<T extends AnyConfigType> = QuestionComponent<ObjectValue<T>, { config: T }>;
// prettier-ignore
const ComplexQuestion: ComplexQuestionComponent<T> = <T>({ props }) => props.format; // Not sure how this could ever work... but also not sure it needs to!

const config = {
  firstName: {
    type: StringQuestion,
    props: { label: "First Name" },
  },
  isDeleted: {
    type: BooleanQuestion,
    props: { format: "yes-no" },
  },
} satisfies AnyConfigType;

type StringAdditionalProps = AdditionalProps<StringQuestionComponent>;
type StringField = Field<string, StringAdditionalProps>;
type StringValue = FieldValue<StringField>;
type ConfigValue = ObjectValue<typeof config>;
type RawConfigValue = RawObjectValue<typeof config>;
