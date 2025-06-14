import { Submit } from "@/components/alert-processing/question/lib/use-question";
import {
  DateQuestion,
  DateQuestionAdditionalProps,
} from "@/components/alert-processing/question/type/DateQuestion";
import {
  EnumQuestion,
  EnumQuestionAdditionalProps,
} from "@/components/alert-processing/question/type/EnumQuestion";
import {
  StringQuestion,
  StringQuestionAdditionalProps,
} from "@/components/alert-processing/question/type/StringQuestion";
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

export class DateField extends Field<Date, DateQuestionAdditionalProps> {
  getComponent(
    key: string,
    input: Maybe<Date>,
    onSubmit: Submit<Date>,
    parentError: string | null,
  ): React.ReactElement {
    return (
      <DateQuestion
        key={key}
        input={input}
        onSubmit={onSubmit}
        parentError={parentError}
        props={this._props}
      />
    );
  }
}

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
