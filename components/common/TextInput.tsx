import clsx from "clsx";
import React from "react";

import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import { Button } from "@/components/core/Button";
import { Column } from "@/components/core/Column";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { label, error, type, ...rest } = props;

    const [textType, setTextType] =
      React.useState<TextInputProps["type"]>(type);

    return (
      <Column className="gap-2">
        {label && (
          <label htmlFor={props.id} className="peer">
            <Text style="subtitle">{label}</Text>
          </label>
        )}
        <Row className="bg-background h-10 rounded">
          <input
            ref={ref}
            {...rest}
            type={textType}
            className={clsx(
              "flex-1 p-2 outline -outline-offset-1 focus:outline-2 focus:-outline-offset-2 max-sm:placeholder:text-xs",
              error ? "outline-error" : "outline-soft",
              type === "password" ? "rounded-s" : "rounded",
            )}
          />
          {props.type === "password" && (
            <With className="*:focus-visible:outline-none">
              <Button
                onClick={() => {
                  setTextType((type) =>
                    type === "password" ? "text" : "password",
                  );
                }}
              >
                <Column
                  justify="center"
                  align="center"
                  className={clsx(
                    "w-18 rounded-e px-4 outline -outline-offset-1 group-focus:outline-2 group-focus:-outline-offset-2",
                    "bg-soft group-hover:bg-soft-hover group-active:bg-soft-active",
                    error ? "outline-error" : "outline-soft",
                  )}
                >
                  <Text>{textType === "password" ? "Show" : "Hide"}</Text>
                </Column>
              </Button>
            </With>
          )}
        </Row>
        {error && <Text style="small-red">{error}</Text>}
      </Column>
    );
  },
);

TextInput.displayName = "TextInput";
