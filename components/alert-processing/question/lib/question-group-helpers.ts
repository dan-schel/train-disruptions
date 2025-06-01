import { Maybe } from "@/shared/types/maybe";

export function wrapInput<T>(input: T | null): Maybe<T> {
  return input == null ? null : { value: input };
}

export function update<Raw extends object, Key extends keyof Raw>(
  handleSubquestionSubmit: (change: (value: Raw) => Raw) => void,
  key: Key,
) {
  return (raw: Raw[Key]) => {
    handleSubquestionSubmit((existingValue) => ({
      ...existingValue,
      [key]: { value: raw },
    }));
  };
}
