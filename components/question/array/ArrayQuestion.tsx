import React from "react";
import { QuestionProps } from "@/components/question/common/use-question";
import { useQuestionGroup } from "@/components/question/common/use-question-group";
import { Field } from "@/components/question/common/field";
import { ArrayValidateFunction } from "@/components/question/array/types";
import {
  useArrayInitializer,
  useArrayValidator,
} from "@/components/question/array/hooks";

export type ArrayQuestionAdditionalProps<Type> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: Field<Type, any>;

  label: string;
  validate?: ArrayValidateFunction<Type>;
};

export type ArrayQuestionProps<Type> = QuestionProps<
  Type[],
  ArrayQuestionAdditionalProps<Type>
>;

export function ArrayQuestion<Type>(props: ArrayQuestionProps<Type>) {
  const setup = useArrayInitializer<Type>();
  const validate = useArrayValidator(props.props.validate ?? null);
  const question = useQuestionGroup({ props, setup, validate });

  // TODO: [DS] Render the array, with the ability to add/remove items.
  // To achieve it, we probably need more state. E.g. how can we track when the
  // user has clicked "add" but hasn't yet filled in the new item? The state
  // type should probably be Maybe<Type>[] instead of Type[].
  //
  // (I should just need to modify useArrayInitializer and useArrayValidator.)
  return <></>;
}
