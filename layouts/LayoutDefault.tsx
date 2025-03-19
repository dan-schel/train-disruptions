import "@/layouts/tailwind.css";

import React, { useEffect, useMemo, useState } from "react";

import { DesktopNavBar } from "@/components/navigation/DesktopNavBar";
import { MobileNavBar } from "@/components/navigation/MobileNavBar";
import { Column } from "@/components/core/Column";
import { With } from "@/components/core/With";
import {
  AdminVisibilityContent,
  AdminVisibilityContext,
} from "@/context/AdminVisibility";
import { useSettings } from "@/hooks/useSettings";

const visibilityThreshold = 5;

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isReactElement(children)) {
    throw new Error("Layout expects one child.");
  }

  const { fetchSettings } = useSettings();
  const [count, setCount] = useState<number>(0);
  const [initial, setInitial] = useState<boolean>(false);
  const [showAdminTab, setShowAdminTab] = useState<boolean>(false);

  useEffect(() => {
    const { showAdminTab } = fetchSettings().toJSON();
    setInitial(showAdminTab);
    setShowAdminTab(showAdminTab);
  }, [fetchSettings]);

  const contextValue = useMemo<AdminVisibilityContent>(
    () => ({
      incrementCount: () => setCount((prev) => prev + 1),
      showToggle: initial || count >= visibilityThreshold,
      showAdminTab,
      toggleAdminTab: () => setShowAdminTab((prev) => !prev),
    }),
    [count, initial, showAdminTab],
  );

  return (
    <Column className="bg-surface text-typography min-h-screen transition-colors">
      <AdminVisibilityContext.Provider value={contextValue}>
        <DesktopNavBar />
        <MobileNavBar />
        <With flexGrow="1" className="pb-16 md:pt-12 md:pb-0">
          {children}
        </With>
      </AdminVisibilityContext.Provider>
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
