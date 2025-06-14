import React from "react";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { q } from "@/components/alert-processing/question";
import { ObjectQuestion } from "@/components/alert-processing/question/object/ObjectQuestion";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
  ObjectValue,
} from "@/components/alert-processing/question/object/types";

const config = {
  mode: q.enum({
    label: "Some enum question",

    // TODO: [DS] Would be cool if the `as const` wasn't needed. Zod seems to
    // work without it for z.enum().
    values: ["option-1", "option-2", "option-3"] as const,
  }),
} satisfies AnyObjectConfig;

const validate: ObjectValidateFunction<typeof config> = () => {
  return null;
};

export function SomeQuestion(
  props: QuestionProps<ObjectValue<typeof config>, null>,
) {
  return (
    <ObjectQuestion<typeof config> {...props} props={{ config, validate }} />
  );
}
