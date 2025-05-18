import { QuestionInput } from "@/components/alert-processing/question/lib/use-question";

export function wrapInput<T>(input: T | null): QuestionInput<T> {
  return input == null ? null : { value: input };
}

export function update<Raw extends object, Key extends keyof Raw>(
  handleSubquestionSubmit: (change: (value: Raw) => Raw) => void,
  key: Key,
) {
  return (raw: Raw[Key]) => {
    handleSubquestionSubmit((existingValue) => ({
      ...existingValue,
      [key]: raw,
    }));
  };
}
