import React from "react";
import {
  EnumQuestion,
  EnumQuestionAdditionalProps,
} from "@/components/alert-processing/question/enum/EnumQuestion";
import { Field } from "@/components/alert-processing/question/lib/field";
import { Submit } from "@/components/alert-processing/question/lib/use-question";
import { Maybe } from "@/shared/types/maybe";

export class EnumField<T extends string> extends Field<
  T,
  EnumQuestionAdditionalProps<T>
> {
  getComponent(
    key: string,
    input: Maybe<T>,
    onSubmit: Submit<T>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <EnumQuestion<T>
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
