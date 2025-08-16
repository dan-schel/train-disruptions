import "@/layouts/tailwind.css";

import React from "react";

import { Column } from "@/components/core/Column";
import { SettingsProvider } from "@/components/settings/SettingsProvider";

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
      <SettingsProvider>{children}</SettingsProvider>
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
