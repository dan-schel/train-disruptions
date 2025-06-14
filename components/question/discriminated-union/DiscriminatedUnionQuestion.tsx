import React from "react";
import { QuestionProps } from "@/components/question/lib/use-question";
import { useQuestionGroup } from "@/components/question/lib/use-question-group";
import {
  AnyDiscriminatedUnionConfig,
  DiscriminatedUnionValue,
  RawDiscriminatedUnionValue,
  SemiRawDiscriminatedUnionValue,
  TypesWithinUnion,
} from "@/components/question/discriminated-union/types";
import {
  useDiscriminatedUnionInitializer,
  useDiscriminatedUnionValidator,
} from "@/components/question/discriminated-union/hooks";
import { EnumQuestion } from "@/components/question/enum/EnumQuestion";

export type DiscriminatedUnionQuestionAdditionalProps<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
> = {
  discriminator: Discriminator;
  config: Config;
  typeQuestion: string;
  typeFormatting: Record<TypesWithinUnion<Config>, string>;
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

  function handleTypeChange(newType: TypesWithinUnion<Config>) {
    // Handle the unusual case where the object for a particular type of
    // discriminator has no fields (so we can submit immediately).
    const newObjIsEmpty = !props.props.config[newType].hasKeys();
    const newValue = newObjIsEmpty ? {} : null;

    const newRaw = {
      type: newType,
      value: newValue,
    } as RawDiscriminatedUnionValue<Config>;

    question.handleSubquestionSubmit(() => newRaw);
  }

  return (
    <>
      <EnumQuestion<TypesWithinUnion<Config>>
        input={type != null ? { value: type } : null}
        onSubmit={handleTypeChange}
        props={{
          label: props.props.typeQuestion,
          values: Object.keys(props.props.config),
          formatting: props.props.typeFormatting,
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
