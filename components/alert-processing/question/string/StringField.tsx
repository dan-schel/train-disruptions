import React from "react";
import { Field } from "@/components/alert-processing/question/lib/field";
import { Submit } from "@/components/alert-processing/question/lib/use-question";
import {
  StringQuestion,
  StringQuestionAdditionalProps,
} from "@/components/alert-processing/question/string/StringQuestion";
import { Maybe } from "@/shared/types/maybe";

export class StringField extends Field<string, StringQuestionAdditionalProps> {
  getComponent(
    key: string,
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
