import React from "react";
import { With } from "@/components/core/With";
import clsx from "clsx";

export type PagePaddingProps = {
  children: React.ReactElement;
  excludingTop?: boolean;
};

export function PagePadding(props: PagePaddingProps) {
  return (
    <With
      className={clsx(`px-4 pb-6 md:px-6 md:pb-8`, {
        "pt-6 md:pt-8": !(props.excludingTop ?? false),
      })}
    >
      {props.children}
    </With>
  );
}
