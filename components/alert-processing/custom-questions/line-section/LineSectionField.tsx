import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  LineSectionQuestion,
  LineSectionQuestionAdditionalProps,
} from "@/components/alert-processing/custom-questions/line-section/LineSectionQuestion";
import { LineSectionInput } from "@/shared/schemas/alert-processing/disruption-data-input";

export class LineSectionField extends Field<
  LineSectionInput,
  LineSectionQuestionAdditionalProps
> {
  getComponent(
    key: string | number,
    input: Maybe<LineSectionInput>,
    onSubmit: Submit<LineSectionInput>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <LineSectionQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}

export function buildLineSection(p: LineSectionQuestionAdditionalProps) {
  return new LineSectionField(p);
}
