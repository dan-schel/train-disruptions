import "./tailwind.css";

import React from "react";

import { Header } from "../components/navigation/Header";
import { DesktopNavBar } from "../components/navigation/DesktopNavBar";
import { MobileNavBar } from "../components/navigation/MobileNavBar";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-between lg:justify-start">
      <DesktopNavBar />
      <MobileNavBar />
      <div className="grid w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
