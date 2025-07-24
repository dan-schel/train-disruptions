import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/common/use-question";
import { SubmittedQuestion } from "@/components/question/common/SubmittedQuestion";
import { ActiveQuestion } from "@/components/question/common/ActiveQuestion";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";
import {
  useLineSectionInitializer,
  useLineSectionValidator,
} from "@/components/alert-processing/custom-questions/line-section/hooks";
import { Select } from "@/components/common/Select";
import { LineSectionInput } from "@/shared/schemas/alert-processing/disruption-data-input";
import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";
import { Row } from "@/components/core/Row";

export type LineSectionQuestionAdditionalProps = {
  label: string;
};

export type LineSectionQuestionProps = QuestionProps<
  LineSectionInput,
  LineSectionQuestionAdditionalProps
>;

export function LineSectionQuestion(props: LineSectionQuestionProps) {
  const context = useAlertProcessingContext();

  const setup = useLineSectionInitializer();
  const validate = useLineSectionValidator();
  const question = useQuestion({ props, setup, validate });

  // const options = context.stations.map((station) => ({
  //   value: station.id.toFixed(),
  //   label: station.name,
  // }));

  return question.isEditorOpen ? (
    <ActiveQuestion
      label={props.props.label}
      onSubmit={question.handleSubmit}
      error={question.error}
      isCancelable={question.isEditMode}
      onCancel={question.onEditCancelClick}
      wrapInForm={true}
    >
      <Row>
        <p>Stuff</p>
      </Row>
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      value={formatLineSection(context, question.value)}
      onEditClick={question.onEditClick}
    />
  );
}

function formatLineSection(
  context: AlertProcessingContextData,
  value: LineSectionInput,
) {
  return "stuff";
}
