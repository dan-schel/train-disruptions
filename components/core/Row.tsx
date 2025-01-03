import React from "react";
import clsx from "clsx";

export type RowProps = {
  children: React.ReactNode;
  className?: string;
  align?: "stretch" | "top" | "center" | "bottom";
  justify?: "left" | "center" | "right" | "space-between";
};

export function Row(props: RowProps) {
  const align = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
    stretch: "items-stretch",
  }[props.align ?? "stretch"];

  const justify = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
    "space-between": "justify-between",
  }[props.justify ?? "left"];

  return (
    <div className={clsx("flex flex-row", justify, align, props.className)}>
      {props.children}
    </div>
  );
}
