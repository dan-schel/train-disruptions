import React from "react";
import { QuestionProps } from "@/components/alert-processing/question/lib/use-question";
import { useQuestionGroup } from "@/components/alert-processing/question/lib/use-question-group";
import {
  useObjectInitializer,
  useObjectValidator,
} from "@/components/alert-processing/question/object/hooks";
import {
  AnyConfigType,
  ObjectValidateFunction,
  ObjectValue,
} from "@/components/alert-processing/question/object/types";
import { nonNull } from "@dan-schel/js-utils";

export type ObjectQuestionAdditionalProps<Config extends AnyConfigType> = {
  config: Config;
  validate: ObjectValidateFunction<Config>;
};

export type ObjectQuestionProps<Config extends AnyConfigType> = QuestionProps<
  ObjectValue<Config>,
  ObjectQuestionAdditionalProps<Config>
>;

export function ObjectQuestion<Config extends AnyConfigType>(
  props: ObjectQuestionProps<Config>,
) {
  const setup = useObjectInitializer(props.props.config);
  const validate = useObjectValidator(props.props.validate);
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
          (newValue) => {
            question.handleSubquestionSubmit((existingValue) => ({
              ...existingValue,
              [key]: { value: newValue },
            }));
          },
          question.error,
        );
      })}
    </>
  );
}
