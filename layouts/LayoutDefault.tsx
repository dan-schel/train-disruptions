import "./tailwind.css";

import React from "react";

import { DesktopNavBar } from "../components/navigation/DesktopNavBar";
import { MobileNavBar } from "../components/navigation/MobileNavBar";
import { Column } from "../components/core/Column";
import { With } from "../components/core/With";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isReactElement(children)) {
    throw new Error("Layout expects one child.");
  }

  return (
    <Column className="min-h-screen w-[max(100vw,var(--page-min-width))] overflow-x-hidden">
      <DesktopNavBar />
      <MobileNavBar />
      <With flexGrow="1" className="pb-16 md:pt-12 md:pb-0">
        {children}
      </With>
    </Column>
  );
}

function isReactElement(node: React.ReactNode): node is React.ReactElement {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    "props" in node &&
    "key" in node
  );
}
