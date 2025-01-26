import "./tailwind.css";

import React from "react";

import { Header } from "../components/navigation/Header";
import { NavBar } from "../components/navigation/NavBar";

export default function LayoutDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-between lg:justify-start">
      <div className="grid w-full">
        <Header />
        {children}
      </div>
      <NavBar />
    </div>
  );
}
