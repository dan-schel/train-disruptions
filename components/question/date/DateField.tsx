import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import {
  DateQuestion,
  DateQuestionAdditionalProps,
} from "@/components/question/date/DateQuestion";
import { Maybe } from "@/shared/types/maybe";

export class DateField extends Field<Date, DateQuestionAdditionalProps> {
  getComponent(
    key: string | number,
    input: Maybe<Date>,
    onSubmit: Submit<Date>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <DateQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
