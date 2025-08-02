import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  StationQuestion,
  StationQuestionAdditionalProps,
} from "@/components/processing/custom-questions/station/StationQuestion";

export class StationField extends Field<
  number,
  StationQuestionAdditionalProps
> {
  getComponent(
    key: string | number,
    input: Maybe<number>,
    onSubmit: Submit<number>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <StationQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}

export function buildStation(p: StationQuestionAdditionalProps) {
  return new StationField(p);
}
