import "@/layouts/tailwind.css";

import React from "react";

import { DesktopNavBar } from "@/components/navigation/DesktopNavBar";
import { MobileNavBar } from "@/components/navigation/MobileNavBar";
import { Column } from "@/components/core/Column";
import { With } from "@/components/core/With";
import { SettingsProvider } from "@/components/settings/SettingsProvider";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { CenterAccountingForNav } from "@/components/navigation/CenterAccountingForNav";

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
        <CenterAccountingForNav className="_page-loader">
          <LoadingSpinner style="large" />
        </CenterAccountingForNav>
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
