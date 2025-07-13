import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  ArrayQuestion,
  ArrayQuestionAdditionalProps,
} from "@/components/question/array/ArrayQuestion";

export class ArrayField<Type> extends Field<
  Type[],
  ArrayQuestionAdditionalProps<Type>
> {
  getComponent(
    key: string | number,
    input: Maybe<Type[]>,
    onSubmit: Submit<Type[]>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <ArrayQuestion<Type>
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
