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
  ValueOfConfig,
} from "@/components/alert-processing/question/type/complex/object-builder/field-types";
import { nonNull } from "@dan-schel/js-utils";

type Q<Config extends ConfigBase> = UseQuestionGroupArgs<
  ValueOfConfig<Config>,
  RawValueOfConfig<Config>
>;

export type ObjectBuilderQuestionProps<Config extends ConfigBase> = {
  config: Config;
  validate: (
    input: ValueOfConfig<Config>,
  ) => { error: string; questionsToInvalidate: (keyof Config)[] } | null;
} & Q<Config>["props"];

export function ObjectBuilderQuestion<Config extends ConfigBase>(
  props: ObjectBuilderQuestionProps<Config>,
) {
  const setup = React.useCallback<Q<Config>["setup"]>(
    (input) => {
      const result: Record<string, unknown> = {};
      for (const key of Object.keys(props.config)) {
        result[key] = input?.value[key] ?? null;
      }
      return result as RawValueOfConfig<Config>;
    },
    [props],
  );

  const validate = React.useCallback<Q<Config>["validate"]>(
    (raw) => {
      if (Object.values(raw).some((value) => value == null)) {
        return { raw: raw, error: null };
      }
      const error = props.validate(raw as ValueOfConfig<Config>);
      if (error != null) {
        const newRaw = { ...raw };
        for (const key of error.questionsToInvalidate) {
          newRaw[key] = null;
        }
        return { raw: newRaw as RawValueOfConfig<Config>, error: error.error };
      }
      return { value: raw as ValueOfConfig<Config> };
    },
    [props],
  );

  const question = useQuestionGroup({
    props,
    setup,
    validate,
  });

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
