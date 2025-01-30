import React from "react";
import { With } from "../core/With";

export type PagePaddingProps = {
  children: React.ReactElement;
};

export function PagePadding(props: PagePaddingProps) {
  return <With className="px-4 py-6 md:px-6 md:py-8">{props.children}</With>;
}
