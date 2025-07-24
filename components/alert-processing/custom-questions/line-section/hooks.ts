import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";
import { LineSectionInput } from "@/shared/schemas/alert-processing/disruption-data-input";
import { chooseBoundariesForLine } from "@/components/alert-processing/custom-questions/line-section/utils";

export type LineSectionQuestionState = {
  line: string;
  a: string;
  b: string;
};

export function useLineSectionInitializer() {
  const context = useAlertProcessingContext();

  return React.useCallback<
    QuestionSetup<LineSectionInput, LineSectionQuestionState>
  >(
    (input) => {
      const defaultLine = context.lines[0].id;
      const defaultBoundaries = chooseBoundariesForLine(context, defaultLine);

      return {
        line: (input?.value.line ?? defaultLine).toFixed(),
        a: input?.value.a ?? defaultBoundaries.a,
        b: input?.value.b ?? defaultBoundaries.b,
      };
    },
    [context],
  );
}

export function useLineSectionValidator() {
  const context = useAlertProcessingContext();

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
