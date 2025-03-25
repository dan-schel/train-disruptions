import "@/layouts/tailwind.css";

import React from "react";

import { DesktopNavBar } from "@/components/navigation/DesktopNavBar";
import { MobileNavBar } from "@/components/navigation/MobileNavBar";
import { Column } from "@/components/core/Column";
import { With } from "@/components/core/With";
import { SettingsProvider } from "@/components/SettingsProvider";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isReactElement(children)) {
    throw new Error("Layout expects one child.");
  }

  return (
    <Column className="min-h-screen">
      <SettingsProvider>
        <DesktopNavBar />
        <MobileNavBar />
        {/* TODO: [DS] This is a bit messy! */}
        <div className="_page-loader fixed top-[calc((100%---spacing(16))*0.5)] left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu md:top-[calc((100%+--spacing(12))*0.5)]">
          <LoadingSpinner style="large" />
        </div>
        <With flexGrow="1" className="_page-container pb-16 md:pt-12 md:pb-0">
          {children}
        </With>
      </SettingsProvider>
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
