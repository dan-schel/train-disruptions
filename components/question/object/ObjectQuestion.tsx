import React from "react";
import { QuestionProps } from "@/components/question/common/use-question";
import { useQuestionGroup } from "@/components/question/common/use-question-group";
import {
  useObjectInitializer,
  useObjectValidator,
} from "@/components/question/object/hooks";
import {
  AnyObjectConfig,
  ObjectValidateFunction,
  ObjectValue,
} from "@/components/question/object/types";
import { nonNull } from "@dan-schel/js-utils";

export type ObjectQuestionAdditionalProps<Config extends AnyObjectConfig> = {
  config: Config;
  validate: ObjectValidateFunction<Config>;
};

export type ObjectQuestionProps<Config extends AnyObjectConfig> = QuestionProps<
  ObjectValue<Config>,
  ObjectQuestionAdditionalProps<Config>
>;

export function ObjectQuestion<Config extends AnyObjectConfig>(
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
