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

type FieldValue<T> = T extends Field<infer V, any> ? V : never;

type AdditionalProps<T> = T extends QuestionComponent<any, infer E> ? E : never;

type ObjectValue<C> = {
  [K in keyof C]: FieldValue<C[K]>;
};

type RawObjectValue<C> = {
  [K in keyof C]: Maybe<FieldValue<C[K]>>;
};

// ----------- EXAMPLE -----------

type StringQuestionComponent = QuestionComponent<string, { label: string }>;
type StringAdditionalProps = AdditionalProps<StringQuestionComponent>;
type StringField = Field<string, StringAdditionalProps>;
type StringValue = FieldValue<StringField>;

const StringQuestion: StringQuestionComponent = ({ props }) => props.label;

const stringField: StringField = {
  type: StringQuestion,
  props: { label: "First name" },
};

const config = {
  firstName: {
    type: StringQuestion,
    props: { label: "First name" },
  },
};

type ConfigValue = ObjectValue<typeof config>;
type RawConfigValue = RawObjectValue<typeof config>;
