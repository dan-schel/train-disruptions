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
