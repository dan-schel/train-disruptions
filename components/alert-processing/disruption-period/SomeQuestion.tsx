import React from "react";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { q } from "@/components/alert-processing/question";
import { DiscriminatedUnionQuestion } from "@/components/alert-processing/question/discriminated-union/DiscriminatedUnionQuestion";
import {
  AnyDiscriminatedUnionConfig,
  DiscriminatedUnionValue,
} from "@/components/alert-processing/question/discriminated-union/types";

const config = {
  mode1: q.object({
    config: { field1: q.string({ label: "Field 1" }) },
    validate: () => null,
  }),
  mode2: q.object({
    config: { field2: q.string({ label: "Field 2" }) },
    validate: () => null,
  }),
} satisfies AnyDiscriminatedUnionConfig;

export function SomeQuestion(
  props: QuestionProps<DiscriminatedUnionValue<"type", typeof config>, null>,
) {
  return (
    <DiscriminatedUnionQuestion<"type", typeof config>
      {...props}
      props={{ config, discriminator: "type" }}
    />
  );
}
