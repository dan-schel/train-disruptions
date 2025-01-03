import React from "react";

const styles = {
  regular: "",
  title: "font-bold text-orange-700",
  weak: "text-gray-500",
};

export type TextProps = {
  children: React.ReactNode;
  style?: keyof typeof styles;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

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
  const style = styles[props.style ?? "regular"];

  // TODO: [DS] One-line mode and line-height fixes.

  return <Tag className={style}>{props.children}</Tag>;
}
