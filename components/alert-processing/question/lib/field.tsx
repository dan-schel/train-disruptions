import { Submit } from "@/components/alert-processing/question/lib/use-question";
import { Maybe } from "@/shared/types/maybe";
import React from "react";

export abstract class Field<Type, Props> {
  constructor(protected readonly _props: Props) {}

  abstract getComponent(
    key: string,
    input: Maybe<Type>,
    onSubmit: Submit<Type>,
    parentError: string | null,
  ): React.ReactElement;
}
