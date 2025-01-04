import React from "react";
import clsx from "clsx";

const styles = {
  regular: "",
  title: "text-lg",
  weak: "text-sm text-gray-500",
};

type Style =
  | { style?: keyof typeof styles }
  | { style: "custom"; className: string };

export type TextProps = {
  children: React.ReactNode;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right" | "justify";
  oneLine?: boolean;
} & Style;

/**
 * Rules:
 * - Do not nest `<Text>` elements.
 * - Never use `className` for margin/padding on `<Text>`.
 *
 * ([More info](https://github.com/dan-schel/train-disruptions/blob/master/docs/ui-conventions.md))
 */
export function Text(props: TextProps) {
  const Tag = props.as ?? "span";

  const style =
    props.style === "custom"
      ? props.className
      : styles[props.style ?? "regular"];

  const align = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  }[props.align ?? "left"];

  if (props.oneLine) {
    return (
      <div className="_one-line">
        <Tag className={clsx(style, align, "_text")}>{props.children}</Tag>
      </div>
    );
  } else {
    return <Tag className={clsx(style, align, "_text")}>{props.children}</Tag>;
  }
}
