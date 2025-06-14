import React from "react";
import { Field } from "@/components/alert-processing/question/lib/field";
import { Submit } from "@/components/alert-processing/question/lib/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  NumberQuestion,
  NumberQuestionAdditionalProps,
} from "@/components/alert-processing/question/number/NumberQuestion";

export class NumberField extends Field<number, NumberQuestionAdditionalProps> {
  getComponent(
    key: string,
    input: Maybe<number>,
    onSubmit: Submit<number>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <NumberQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
