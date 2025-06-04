import React from "react";
import {
  QuestionProps,
  useQuestion,
  UseQuestionArgs,
} from "@/components/alert-processing/question/lib/use-question";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { Text } from "@/components/core/Text";
import { RadioButton } from "@/components/common/RadioButton";
import { uuid } from "@dan-schel/js-utils";
import { Column } from "@/components/core/Column";
import { Spacer } from "@/components/core/Spacer";

type Q<T extends string> = UseQuestionArgs<T, T | null>;

export type EnumQuestionAdditionalProps<T extends string> = {
  label: string;
  values: T[];
};

export type EnumQuestionProps<T extends string> = QuestionProps<
  T,
  EnumQuestionAdditionalProps<T>
>;

export function EnumQuestion<T extends string>(props: EnumQuestionProps<T>) {
  const [group] = React.useMemo(uuid, []);

  const validate = React.useCallback<Q<T>["validate"]>((raw) => {
    if (raw == null) return { error: "Please choose an option" };
    return { value: raw };
  }, []);

  const setup = React.useCallback<Q<T>["setup"]>((input) => {
    return input?.value ?? null;
  }, []);

  const question = useQuestion({ props, setup, validate });

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
      wrapInForm={true}
    >
      <Column className="gap-4 pt-2 pb-4">
        {props.props.values.map((value) => (
          <RadioButton
            key={value}
            group={group}
            checked={question.value === value}
            onChange={() => question.setValue(value)}
          >
            <Text>{value}</Text>
          </RadioButton>
        ))}
      </Column>
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      value={question.value}
      onEditClick={question.onEditClick}
    />
  );
}
