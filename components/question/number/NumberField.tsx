import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  NumberQuestion,
  NumberQuestionAdditionalProps,
} from "@/components/question/number/NumberQuestion";

export class NumberField extends Field<number, NumberQuestionAdditionalProps> {
  getComponent(
    key: string | number,
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
