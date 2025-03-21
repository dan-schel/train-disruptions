import React, { useState } from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import clsx from "clsx";
import { Row } from "@/components/core/Row";
import { SimpleButton } from "@/components/common/SimpleButton";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  error?: string;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url";
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const { label, error, type, ...rest } = props;

    const [passwordType, setPasswordType] =
      useState<TextInputProps["type"]>(type);

    return (
      <Column className="group gap-2">
        {label && (
          <label htmlFor={props.id}>
            <Text style="subtitle">{label}</Text>
          </label>
        )}
        <Row
          align="stretch"
          justify="center"
          className={clsx(
            "overflow-hidden rounded border-2",
            error
              ? "border-red-400 group-hover:border-red-500"
              : "border-action-secondary group-hover:border-slate-300",
          )}
        >
          <input
            ref={ref}
            {...rest}
            type={passwordType}
            className="h-10 grow bg-slate-200/10 p-2 focus-visible:outline-none"
          />
          {props.type === "password" && (
            <SimpleButton
              layout="tile"
              text={passwordType === "password" ? "Show" : "Hide"}
              onClick={() => {
                setPasswordType((prev) =>
                  prev === "password" ? "text" : "password",
                );
              }}
            />
          )}
        </Row>
        {error && <Text style="input-error">{error}</Text>}
      </Column>
    );
  },
);

TextInput.displayName = "Input";
