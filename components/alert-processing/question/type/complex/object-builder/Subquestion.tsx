import React from "react";
import { update } from "@/components/alert-processing/question/lib/question-group-helpers";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";
import {
  AnyConfigType,
  ObjectValue,
  RawObjectValue,
} from "@/components/alert-processing/question/type/complex/object-builder/types";

type Question<Config extends AnyConfigType> = ReturnType<
  typeof useQuestionGroup<ObjectValue<Config>, RawObjectValue<Config>>
>;

export type SubquestionProps<Config extends AnyConfigType> = {
  fieldKey: string;
  field: Config[string];
  question: Question<Config>;
};

export function Subquestion<Config extends AnyConfigType>({
  fieldKey,
  field,
  question,
}: SubquestionProps<Config>) {
  const Element = field.type;
  const input = question.value[fieldKey];
  const props = field.props;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  return (
    <Element
      input={input as any}
      onSubmit={update(question.handleSubquestionSubmit, fieldKey) as any}
      parentError={question.error}
      props={props as any}
    />
  );
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
