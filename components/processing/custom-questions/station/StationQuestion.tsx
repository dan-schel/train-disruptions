import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/common/use-question";
import { SubmittedQuestion } from "@/components/question/common/SubmittedQuestion";
import { ActiveQuestion } from "@/components/question/common/ActiveQuestion";
import { useProcessingContext } from "@/components/processing/use-processing-context";
import {
  useStationInitializer,
  useStationValidator,
} from "@/components/processing/custom-questions/station/hooks";
import { Select } from "@/components/common/Select";

export type StationQuestionAdditionalProps = {
  label: string;
};

export type StationQuestionProps = QuestionProps<
  number,
  StationQuestionAdditionalProps
>;

export function StationQuestion(props: StationQuestionProps) {
  const context = useProcessingContext();

  const setup = useStationInitializer();
  const validate = useStationValidator();
  const question = useQuestion({ props, setup, validate });

  const options = context.stations.map((station) => ({
    value: station.id.toFixed(),
    label: station.name,
  }));

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
      wrapInForm={true}
    >
      <Select
        options={options}
        value={question.value}
        onChange={question.setValue}
      />
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      value={
        context.stations
          .find((l) => l.id === question.value)
          ?.name.toString() ?? "Unknown station"
      }
      onEditClick={question.onEditClick}
    />
  );
}
