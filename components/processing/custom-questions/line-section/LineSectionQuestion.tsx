import React from "react";
import {
  QuestionProps,
  useQuestion,
} from "@/components/question/common/use-question";
import { SubmittedQuestion } from "@/components/question/common/SubmittedQuestion";
import { ActiveQuestion } from "@/components/question/common/ActiveQuestion";
import { useProcessingContext } from "@/components/processing/use-processing-context";
import {
  LineSectionQuestionState,
  useLineSectionInitializer,
  useLineSectionValidator,
} from "@/components/processing/custom-questions/line-section/hooks";
import { Select } from "@/components/common/Select";
import { LineSectionInput } from "@/shared/schemas/common/disruption-data-input";
import { ProcessingContextData } from "@/shared/types/processing-context-data";
import { Row } from "@/components/core/Row";
import { chooseBoundariesForLine } from "@/components/processing/custom-questions/line-section/utils";
import { parseIntThrow } from "@dan-schel/js-utils";

export type LineSectionQuestionAdditionalProps = {
  label: string;
};

export type LineSectionQuestionProps = QuestionProps<
  LineSectionInput,
  LineSectionQuestionAdditionalProps
>;

export function LineSectionQuestion(props: LineSectionQuestionProps) {
  const context = useProcessingContext();

  const setup = useLineSectionInitializer();
  const validate = useLineSectionValidator();
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
      <LineSectionEditor value={question.value} onChange={question.setValue} />
    </ActiveQuestion>
  ) : (
    <SubmittedQuestion
      label={props.props.label}
      value={formatLineSection(context, question.value)}
      onEditClick={question.onEditClick}
    />
  );
}

type LineSectionEditorProps = {
  value: LineSectionQuestionState;
  onChange: (value: LineSectionQuestionState) => void;
};

function LineSectionEditor(props: LineSectionEditorProps) {
  const context = useProcessingContext();
  const line = context.lines.find((l) => l.id.toFixed() === props.value.line);
  if (line == null) throw new Error("Line not found in context");

  const lineOptions = context.lines.map((line) => ({
    value: line.id.toFixed(),
    label: line.name,
  }));

  const boundaryOptions = line.lineShapeNodes.map((node) => ({
    value: node.id,
    label: node.name,
  }));

  function handleLineChange(value: string) {
    const { a, b } = chooseBoundariesForLine(context, parseIntThrow(value));
    props.onChange({
      line: value,
      a,
      b,
    });
  }

  function handleBoundaryAChange(value: string) {
    props.onChange({
      ...props.value,
      a: value,
    });
  }

  function handleBoundaryBChange(value: string) {
    props.onChange({
      ...props.value,
      b: value,
    });
  }

  return (
    <Row className="gap-2" wrap>
      <Select
        options={lineOptions}
        value={props.value.line}
        onChange={handleLineChange}
      />
      <Select
        options={boundaryOptions}
        value={props.value.a}
        onChange={handleBoundaryAChange}
      />
      <Select
        options={boundaryOptions}
        value={props.value.b}
        onChange={handleBoundaryBChange}
      />
    </Row>
  );
}

function formatLineSection(
  context: ProcessingContextData,
  value: LineSectionInput,
) {
  const line = context.lines.find((l) => l.id === value.line);
  if (line == null) return "Invalid line";

  const aNode = line.lineShapeNodes.find((n) => n.id === value.a);
  const bNode = line.lineShapeNodes.find((n) => n.id === value.b);
  if (aNode == null || bNode == null) return "Invalid boundary";

  return `${aNode.name} to ${bNode.name} (${line.name} line)`;
}
