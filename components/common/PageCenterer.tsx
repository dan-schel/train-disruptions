import React from "react";
import { With } from "../core/With";

export type PageCentererProps = {
  children: React.ReactElement;
};

export function PageCenterer(props: PageCentererProps) {
  return (
    <div className="grid grid-cols-center lg:grid-cols-center-lg">
      <With className="col-start-2">{props.children}</With>
    </div>
  );
}
