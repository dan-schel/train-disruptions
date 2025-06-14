import React from "react";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";
import { nonNull } from "@dan-schel/js-utils";
import { useObjectBuilderSetup } from "@/components/alert-processing/question/type/complex/object-builder/setup";
import { useObjectBuilderValidate } from "@/components/alert-processing/question/type/complex/object-builder/validate";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import {
  AnyConfigType,
  ObjectValue,
  ValidateFunction,
} from "@/components/alert-processing/question/type/complex/object-builder/types";
import { update } from "@/components/alert-processing/question/lib/question-group-helpers";

export type ObjectBuilderQuestionProps<Config extends AnyConfigType> =
  QuestionProps<
    ObjectValue<Config>,
    {
      config: Config;
      validate: ValidateFunction<Config>;
    }
  >;

export function ObjectBuilderQuestion<Config extends AnyConfigType>(
  props: ObjectBuilderQuestionProps<Config>,
) {
  const setup = useObjectBuilderSetup(props.props.config);
  const validate = useObjectBuilderValidate(props.props.validate);
  const question = useQuestionGroup({ props, setup, validate });

  const answeredQuestions = Object.values(question.value).filter(nonNull);
  const indexOfLastAnsweredQuestion = answeredQuestions.length - 1;
  const questionsToShow = Object.entries(props.props.config).filter(
    (_q, i) => i <= indexOfLastAnsweredQuestion + 1,
  );

  return (
    <>
      {questionsToShow.map(([key, field]) => {
        return field.getComponent(
          key,
          question.value[key],
          update(question.handleSubquestionSubmit, key),
          question.error,
        );
      })}
    </>
  );
}
