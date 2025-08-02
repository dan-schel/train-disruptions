import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { useProcessingContext } from "@/components/processing/use-processing-context";
import { LineSectionInput } from "@/shared/schemas/common/disruption-data-input";
import { chooseBoundariesForLine } from "@/components/processing/custom-questions/line-section/utils";

export type LineSectionQuestionState = {
  line: string;
  a: string;
  b: string;
};

export function useLineSectionInitializer() {
  const context = useProcessingContext();

  return React.useCallback<
    QuestionSetup<LineSectionInput, LineSectionQuestionState>
  >(
    (input) => {
      const defaultLine = context.lines[0].id;
      const defaultBoundaries = chooseBoundariesForLine(context, defaultLine);

      const isValidLine = context.lines.some((x) => x.id === input?.value.line);

      return {
        line: ((isValidLine && input?.value.line) || defaultLine).toFixed(),
        a: (isValidLine && input?.value.a) || defaultBoundaries.a,
        b: (isValidLine && input?.value.b) || defaultBoundaries.b,
      };
    },
    [context],
  );
}

export function useLineSectionValidator() {
  const context = useProcessingContext();

  return React.useCallback<
    QuestionValidator<LineSectionInput, LineSectionQuestionState>
  >(
    ({ line, a, b }) => {
      const lineCtx = context.lines.find((l) => l.id.toFixed() === line);
      if (!lineCtx) {
        return { error: "Not a valid line" };
      }

      if (
        !lineCtx.lineShapeNodes.some((n) => n.id === a) ||
        !lineCtx.lineShapeNodes.some((n) => n.id === b)
      ) {
        return { error: "Invalid line section boundaries" };
      }

      return { value: { line: lineCtx.id, a, b } };
    },
    [context],
  );
}
