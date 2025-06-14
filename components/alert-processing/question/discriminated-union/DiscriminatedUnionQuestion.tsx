import React from "react";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";
import {
  AnyDiscriminatedUnionConfig,
  DiscriminatedUnionValue,
  SemiRawDiscriminatedUnionValue,
  TypesWithinUnion,
} from "@/components/alert-processing/question/discriminated-union/types";
import {
  useDiscriminatedUnionInitializer,
  useDiscriminatedUnionValidator,
} from "@/components/alert-processing/question/discriminated-union/hooks";
import { EnumQuestion } from "@/components/alert-processing/question/enum/EnumQuestion";

export type DiscriminatedUnionQuestionAdditionalProps<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
> = {
  discriminator: Discriminator;
  config: Config;
};

export type DiscriminatedUnionQuestionProps<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
> = QuestionProps<
  DiscriminatedUnionValue<Discriminator, Config>,
  DiscriminatedUnionQuestionAdditionalProps<Discriminator, Config>
>;

export function DiscriminatedUnionQuestion<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
>(props: DiscriminatedUnionQuestionProps<Discriminator, Config>) {
  const setup = useDiscriminatedUnionInitializer<Discriminator, Config>(
    props.props.discriminator,
  );
  const validate = useDiscriminatedUnionValidator<Discriminator, Config>(
    props.props.discriminator,
  );
  const question = useQuestionGroup({ props, setup, validate });

  const type = question.value.type as TypesWithinUnion<Config>;
  return (
    <>
      <EnumQuestion<TypesWithinUnion<Config>>
        input={type != null ? { value: type } : null}
        onSubmit={(value) =>
          question.handleSubquestionSubmit(() => ({ type: value, value: null }))
        }
        props={{
          label: "asdasd",
          values: Object.keys(props.props.config),
        }}
      />
      {type != null &&
        props.props.config[type].getComponent(
          type,
          (question.value as SemiRawDiscriminatedUnionValue<Config>).value ==
            null
            ? null
            : {
                value: (
                  question.value as SemiRawDiscriminatedUnionValue<Config>
                ).value!,
              },
          (newValue) => {
            question.handleSubquestionSubmit((existingValue) => ({
              ...existingValue,
              value: newValue,
            }));
          },
          null,
        )}
    </>
  );
}
