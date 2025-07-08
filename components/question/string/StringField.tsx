import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import {
  StringQuestion,
  StringQuestionAdditionalProps,
} from "@/components/question/string/StringQuestion";
import { Maybe } from "@/shared/types/maybe";

export class StringField extends Field<string, StringQuestionAdditionalProps> {
  getComponent(
    key: string | number,
    input: Maybe<string>,
    onSubmit: Submit<string>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <StringQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
