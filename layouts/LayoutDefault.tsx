import "./tailwind.css";

import React from "react";

import { DesktopNavBar } from "../components/navigation/DesktopNavBar";
import { MobileNavBar } from "../components/navigation/MobileNavBar";
import { Column } from "../components/core/Column";
import { With } from "../components/core/With";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Column className="min-h-screen">
      <DesktopNavBar />
      <MobileNavBar />
      <With flexGrow="1" className="pb-16 md:pb-0 md:pt-12">
        {children}
      </With>
    </Column>
  );
}
