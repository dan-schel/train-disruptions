export type StringField = { type: "string"; label: string };
export type DateField = { type: "date"; label: string };
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
