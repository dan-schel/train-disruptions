import React from "react";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { ObjectBuilderQuestion } from "@/components/alert-processing/question/type/complex/object-builder/ObjectBuilderQuestion";
import {
  AnyConfigType,
  ObjectValue,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/types";
import { EnumQuestion } from "@/components/alert-processing/question/type/EnumQuestion";

const options = ["option-1", "option-2", "option-3"] as const;

const config = {
  mode: {
    type: EnumQuestion<(typeof options)[number]>,
    props: { label: "Some enum question", values: options },
  },
} satisfies AnyConfigType;

const validate: ValidateFunction<typeof config> = () => {
  return null;
};

export function SomeQuestion(
  props: QuestionProps<ObjectValue<typeof config>, null>,
) {
  return (
    <ObjectBuilderQuestion<typeof config>
      {...props}
      props={{ config, validate }}
    />
  );
}
