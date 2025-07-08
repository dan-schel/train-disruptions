import React from "react";
import {
  EnumQuestion,
  EnumQuestionAdditionalProps,
} from "@/components/question/enum/EnumQuestion";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";

export class EnumField<T extends string> extends Field<
  T,
  EnumQuestionAdditionalProps<T>
> {
  getComponent(
    key: string | number,
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
