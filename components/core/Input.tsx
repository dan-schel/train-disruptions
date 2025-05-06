import React from "react";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Input(props: InputProps) {
  return (
    <input
      type="text"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="rounded-md border border-gray-300 p-2"
    />
  );
}
