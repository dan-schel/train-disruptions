import React from "react";
import { StringQuestion } from "@/components/alert-processing/question/type/StringQuestion";
import {
  useQuestionGroup,
  UseQuestionGroupArgs,
} from "@/components/alert-processing/question/lib/use-question-group";
import {
  update,
  wrapInput,
} from "@/components/alert-processing/question/lib/question-group-helpers";
import { DateQuestion } from "@/components/alert-processing/question/type/DateQuestion";
import {
  ConfigBase,
  RawValueOfConfig,
  ValidateFunction,
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";
import { nonNull } from "@dan-schel/js-utils";
import { useObjectBuilderSetup } from "@/components/alert-processing/question/type/complex/object-builder/setup";
import { useObjectBuilderValidate } from "@/components/alert-processing/question/type/complex/object-builder/validate";

type Q<Config extends ConfigBase> = UseQuestionGroupArgs<
  ValueOfConfig<Config>,
  RawValueOfConfig<Config>
>;

export type ObjectBuilderQuestionProps<Config extends ConfigBase> = {
  config: Config;
  validate: ValidateFunction<Config>;
} & Q<Config>["props"];

export function ObjectBuilderQuestion<Config extends ConfigBase>(
  props: ObjectBuilderQuestionProps<Config>,
) {
  const setup = useObjectBuilderSetup(props.config);
  const validate = useObjectBuilderValidate(props.validate);
  const question = useQuestionGroup({ props, setup, validate });

  const answeredQuestions = Object.values(question.value).filter(nonNull);
  const indexOfLastAnsweredQuestion = answeredQuestions.length - 1;
  const questionsToShow = Object.entries(props.config).filter(
    (q, i) => i <= indexOfLastAnsweredQuestion + 1,
  );

  return (
    <>
      {questionsToShow.map(([key, field]) => {
        const Element = {
          string: StringQuestion,
          date: DateQuestion,
        }[field.type];

        return (
          <Element
            key={key}
            label={field.label}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            input={wrapInput(question.value[key]) as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSubmit={update(question.handleSubquestionSubmit, key) as any}
            parentError={question.error}
          />
        );
      })}
    </>
  );
}
