import React from "react";
import { Field } from "@/components/question/common/field";
import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import {
  AnyDiscriminatedUnionConfig,
  DiscriminatedUnionValue,
} from "@/components/question/discriminated-union/types";
import {
  DiscriminatedUnionQuestion,
  DiscriminatedUnionQuestionAdditionalProps,
} from "@/components/question/discriminated-union/DiscriminatedUnionQuestion";

export class DiscriminatedUnionField<
  Discriminator extends string,
  Config extends AnyDiscriminatedUnionConfig,
> extends Field<
  DiscriminatedUnionValue<Discriminator, Config>,
  DiscriminatedUnionQuestionAdditionalProps<Discriminator, Config>
> {
  getComponent(
    key: string | number,
    input: Maybe<DiscriminatedUnionValue<Discriminator, Config>>,
    onSubmit: Submit<DiscriminatedUnionValue<Discriminator, Config>>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <DiscriminatedUnionQuestion<Discriminator, Config>
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}
