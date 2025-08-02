import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  LineQuestion,
  LineQuestionAdditionalProps,
} from "@/components/processing/custom-questions/line/LineQuestion";

export class LineField extends Field<number, LineQuestionAdditionalProps> {
  getComponent(
    key: string | number,
    input: Maybe<number>,
    onSubmit: Submit<number>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <LineQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}

export function buildLine(p: LineQuestionAdditionalProps) {
  return new LineField(p);
}
