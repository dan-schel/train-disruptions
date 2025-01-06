import React from "react";
import { With } from "../core/With";

export type PageCentererProps = {
  children: React.ReactElement;
};

export function PageCenterer(props: PageCentererProps) {
  return (
    <div className="grid grid-cols-[0_1fr_0] lg:grid-cols-[1fr_64rem_1fr]">
      <With gridColumn="2">{props.children}</With>
    </div>
  );
}
