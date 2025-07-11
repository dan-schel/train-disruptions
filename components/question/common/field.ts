import { Submit } from "@/components/question/common/use-question";
import { Maybe } from "@/shared/types/maybe";
import { ReactElement } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyField<Type = any> = Field<Type, any>;

export abstract class Field<Type, Props> {
  constructor(protected readonly _props: Props) {}

  abstract getComponent(
    key: string | number,
    input: Maybe<Type>,
    onSubmit: Submit<Type>,
    parentError: string | null,
  ): ReactElement;
}
