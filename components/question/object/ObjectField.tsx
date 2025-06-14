import React from "react";
import { Field } from "@/components/question/lib/field";
import { Submit } from "@/components/question/lib/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  AnyObjectConfig,
  ObjectValue,
} from "@/components/question/object/types";
import {
  ObjectQuestion,
  ObjectQuestionAdditionalProps,
} from "@/components/question/object/ObjectQuestion";

export class ObjectField<Config extends AnyObjectConfig> extends Field<
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

  hasKeys() {
    return Object.keys(this._props.config).length > 0;
  }
}
