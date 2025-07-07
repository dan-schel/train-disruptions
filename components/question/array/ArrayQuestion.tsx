import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/common/use-question";
import { Field } from "@/components/question/common/field";
import { ArrayValidateFunction } from "@/components/question/array/types";
import {
  useArrayInitializer,
  useArrayValidator,
} from "@/components/question/array/hooks";
import { ActiveQuestion } from "@/components/question/common/ActiveQuestion";
import { SubmittedQuestion } from "@/components/question/common/SubmittedQuestion";
import { SimpleButton } from "@/components/common/SimpleButton";
import { MingcuteAddLine } from "@/components/icons/MingcuteAddLine";
import { Column } from "@/components/core/Column";
import { With } from "@/components/core/With";
import { MingcuteCloseLine } from "@/components/icons/MingcuteCloseLine";
import { nonNull } from "@dan-schel/js-utils";

export type ArrayQuestionAdditionalProps<Type> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: Field<Type, any>;

  label: string;
  validate?: ArrayValidateFunction<Type>;
};

export type ArrayQuestionProps<Type> = QuestionProps<
  Type[],
  ArrayQuestionAdditionalProps<Type>
>;

export function ArrayQuestion<Type>(props: ArrayQuestionProps<Type>) {
  const setup = useArrayInitializer<Type>();
  const validate = useArrayValidator(props.props.validate ?? null);
  const question = useQuestion({ props, setup, validate });

  const itemUnderConstruction =
    question.isEditorOpen && question.value.some((item) => item == null);

  function handleItemSubmit(value: Type, index: number) {
    if (!question.isEditorOpen) return;
    question.setValue((prev) => {
      const newArray = [...prev];
      newArray[index] = { value: value };
      return newArray;
    });
  }

  function handleAddItem() {
    if (!question.isEditorOpen) return;
    question.setValue((prev) => [...prev, null]);
  }

  function handleCancelItem() {
    if (!question.isEditorOpen) return;
    question.setValue((prev) => prev.filter(nonNull));
  }

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
    >
      <Column className="w-full gap-4">
        {question.value.map((item, index) =>
          props.props.field.getComponent(
            index,
            item,
            (value) => handleItemSubmit(value, index),
            null,
          ),
        )}
        <With className="justify-items-start">
          {itemUnderConstruction ? (
            <SimpleButton
              onClick={handleCancelItem}
              text="Cancel"
              icon={<MingcuteCloseLine />}
            />
          ) : (
            <SimpleButton
              onClick={handleAddItem}
              text="Add item"
              icon={<MingcuteAddLine />}
            />
          )}
        </With>
      </Column>
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      value={`${question.value.length} ${question.value.length !== 1 ? "items" : "item"}`}
      onEditClick={question.onEditClick}
    />
  );
}
