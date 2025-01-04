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
} & Style;

/**
 * Do not nest another `<Text>` inside `<Text>`. Only the following tags should
 * be used inside `<Text>`:
 * - `<Link>`
 * - `<b>` (or `<strong>`)
 * - `<i>` (or `<em>`)
 * - `<span>`
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

  // TODO: [DS] One-line mode and line-height fixes.

  return <Tag className={clsx(style, align)}>{props.children}</Tag>;
}
