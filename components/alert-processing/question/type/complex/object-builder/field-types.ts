import { DateQuestionAdditionalProps } from "@/components/alert-processing/question/type/DateQuestion";
import { StringQuestionAdditionalProps } from "@/components/alert-processing/question/type/StringQuestion";

// TODO: [DS] I wonder if this could be even more generic, i.e. we just pass
// which type of Question component to use, i.e. instead of "string" and "date"
// we use StringQuestion and DateQuestion?

export type StringField = {
  type: "string";
  props: StringQuestionAdditionalProps;
};
export type DateField = { type: "date"; props: DateQuestionAdditionalProps };
export type Field = StringField | DateField;

// prettier-ignore
export type ValueOfField<FieldType extends Field> =
    FieldType extends { type: "string" } ? string
  : FieldType extends { type: "date" } ? Date
  : never;

export type RawValueOfField<FieldType extends Field> =
  ValueOfField<FieldType> | null;

export type ConfigBase = { [Key in string]: Field };

export type ValueOfConfig<Config extends ConfigBase> = {
  [Key in keyof Config]: ValueOfField<Config[Key]>;
};

export type RawValueOfConfig<Config extends ConfigBase> = {
  [Key in keyof Config]: RawValueOfField<Config[Key]>;
};

export type ValidateFunction<Config extends ConfigBase> = (
  input: ValueOfConfig<Config>,
) => { error: string; questionsToInvalidate: (keyof Config)[] } | null;
