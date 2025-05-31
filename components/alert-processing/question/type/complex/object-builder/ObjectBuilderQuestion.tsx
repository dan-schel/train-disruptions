import React from "react";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";
import {
  ConfigBase,
  ValidateFunction,
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";
import { nonNull } from "@dan-schel/js-utils";
import { useObjectBuilderSetup } from "@/components/alert-processing/question/type/complex/object-builder/setup";
import { useObjectBuilderValidate } from "@/components/alert-processing/question/type/complex/object-builder/validate";
import { Subquestion } from "@/components/alert-processing/question/type/complex/object-builder/Subquestion";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";

export type ObjectBuilderQuestionProps<Config extends ConfigBase> = {
  config: Config;
  validate: ValidateFunction<Config>;
} & QuestionProps<ValueOfConfig<Config>>;

export function ObjectBuilderQuestion<Config extends ConfigBase>(
  props: ObjectBuilderQuestionProps<Config>,
) {
  const setup = useObjectBuilderSetup(props.config);
  const validate = useObjectBuilderValidate(props.validate);
  const question = useQuestionGroup({ props, setup, validate });

  const answeredQuestions = Object.values(question.value).filter(nonNull);
  const indexOfLastAnsweredQuestion = answeredQuestions.length - 1;
  const questionsToShow = Object.entries(props.config).filter(
    (_q, i) => i <= indexOfLastAnsweredQuestion + 1,
  );

  return (
    <>
      {questionsToShow.map(([key, field]) => {
        return (
          <Subquestion
            key={key}
            field={field}
            fieldKey={key}
            question={question}
          />
        );
      })}
    </>
  );
}
