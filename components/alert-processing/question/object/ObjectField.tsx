import React from "react";
import { Field } from "@/components/alert-processing/question/lib/field";
import { Submit } from "@/components/alert-processing/question/lib/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  AnyConfigType,
  ObjectValue,
} from "@/components/alert-processing/question/object/types";
import {
  ObjectQuestion,
  ObjectQuestionAdditionalProps,
} from "@/components/alert-processing/question/object/ObjectQuestion";

export class ObjectField<Config extends AnyConfigType> extends Field<
  ObjectValue<Config>,
  ObjectQuestionAdditionalProps<Config>
> {
  getComponent(
    key: string,
    input: Maybe<ObjectValue<Config>>,
    onSubmit: Submit<ObjectValue<Config>>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <ObjectQuestion<Config>
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
