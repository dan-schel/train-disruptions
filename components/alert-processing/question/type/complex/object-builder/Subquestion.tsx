import React from "react";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";
import {
  ConfigBase,
  Field,
  RawValueOfConfig,
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";
import {
  update,
  wrapInput,
} from "@/components/alert-processing/question/lib/question-group-helpers";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";

type Question<Config extends ConfigBase> = ReturnType<
  typeof useQuestionGroup<ValueOfConfig<Config>, RawValueOfConfig<Config>>
>;

export type SubquestionProps<Config extends ConfigBase> = {
  fieldKey: string;
  field: Field;
  question: Question<Config>;
};

export function Subquestion<Config extends ConfigBase>({
  fieldKey,
  field,
  question,
}: SubquestionProps<Config>) {
  const Element = {
    string: StringQuestion,
    date: DateQuestion,
  }[field.type];

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (
    <Element
      input={wrapInput(question.value[fieldKey]) as any}
      onSubmit={update(question.handleSubquestionSubmit, fieldKey) as any}
      parentError={question.error}
      {...(field.props as any)}
    />
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
