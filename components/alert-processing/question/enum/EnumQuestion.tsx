import React, { useId } from "react";
import {
  useEnumInitializer,
  useEnumValidator,
} from "@/components/alert-processing/question/enum/hooks";
import { ActiveQuestion } from "@/components/alert-processing/question/lib/ActiveQuestion";
import { SubmittedQuestion } from "@/components/alert-processing/question/lib/SubmittedQuestion";
import {
  QuestionProps,
  useQuestion,
} from "@/components/alert-processing/question/lib/use-question";
import { RadioButton } from "@/components/common/RadioButton";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";

export type EnumQuestionAdditionalProps<T extends string> = {
  label: string;
  values: T[];
};

export type EnumQuestionProps<T extends string> = QuestionProps<
  T,
  EnumQuestionAdditionalProps<T>
>;

export function EnumQuestion<T extends string>(props: EnumQuestionProps<T>) {
  const setup = useEnumInitializer<T>();
  const validate = useEnumValidator<T>();
  const question = useQuestion({ props, setup, validate });

  const groupId = useId();

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
            group={groupId}
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
