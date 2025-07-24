import React from "react";
import {
  QuestionSetup,
  QuestionValidator,
} from "@/components/question/common/use-question";
import { useAlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";
import { LineSectionInput } from "@/shared/schemas/alert-processing/disruption-data-input";
import { LineShapeNode } from "@/shared/types/line-shape-node";

export type LineSectionQuestionState = {
  line: number | null;
  a: LineShapeNode | null;
  b: LineShapeNode | null;
};

export function useLineSectionInitializer() {
  return React.useCallback<
    QuestionSetup<LineSectionInput, LineSectionQuestionState>
  >((input) => {
    return input?.value ?? { line: null, a: null, b: null };
  }, []);
}

export function useLineSectionValidator() {
  const context = useAlertProcessingContext();

  return React.useCallback<
    QuestionValidator<LineSectionInput, LineSectionQuestionState>
  >(
    ({ line, a, b }) => {
      if (line == null || a == null || b == null) {
        return { error: "Some fields not completed" };
      }

      const lineCtx = context.lines.find((l) => l.id === line);
      if (!lineCtx) {
        return { error: "Not a valid line" };
      }

      if (
        !lineCtx.lineShapeNodes.some((n) => n.id === a) ||
        !lineCtx.lineShapeNodes.some((n) => n.id === b)
      ) {
        return { error: "Invalid line section boundaries" };
      }

      return { value: { line, a, b } };
    },
    [context],
  );
}
