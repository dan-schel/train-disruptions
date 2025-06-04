import React from "react";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { ObjectBuilderQuestion } from "@/components/alert-processing/question/type/complex/object-builder/ObjectBuilderQuestion";
import {
  AnyConfigType,
  ObjectValue,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/types";
import { q } from "@/components/alert-processing/question/type/complex/object-builder/field-builders";

const config = {
  mode: q.enum({
    label: "Some enum question",

    // TODO: [DS] Would be cool if the `as const` wasn't needed. Zod seems to
    // work without it for z.enum().
    values: ["option-1", "option-2", "option-3"] as const,
  }),
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
