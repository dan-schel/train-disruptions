import clsx from "clsx";
import React from "react";

export type ColumnProps = {
  children: React.ReactNode;
  className?: string;
  align?: "stretch" | "left" | "center" | "right";
  justify?: "top" | "center" | "bottom" | "space-between";
};

export function Column(props: ColumnProps) {
  const align = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
    stretch: "items-stretch",
  }[props.align ?? "stretch"];

  const justify = {
    top: "justify-start",
    center: "justify-center",
    bottom: "justify-end",
    "space-between": "justify-between",
  }[props.justify ?? "top"];

  return (
    <div className={clsx("flex flex-col", justify, align, props.className)}>
      {props.children}
    </div>
  );
}
