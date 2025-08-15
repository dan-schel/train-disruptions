import React from "react";
import { MingcuteMapLine } from "@/components/icons/MingcuteMapLine";
import { MingcuteToolLine } from "@/components/icons/MingcuteToolLine";
import { MingcuteSettings7Line } from "@/components/icons/MingcuteSettings7Line";
import { MingcuteMapFill } from "@/components/icons/MingcuteMapFill";
import { MingcuteToolFill } from "@/components/icons/MingcuteToolFill";
import { MingcuteSettings7Fill } from "@/components/icons/MingcuteSettings7Fill";

export type NavTab = {
  name: string;
  icon: React.ReactElement;
  iconFill: React.ReactElement;
  path: string;
  active: (url: string) => boolean;
};

export const overview: NavTab = {
  name: "Overview",
  icon: <MingcuteMapLine />,
  iconFill: <MingcuteMapFill />,
  path: "/",
  active: (url: string) =>
    !url.startsWith("/admin") && !url.startsWith("/settings"),
};

export const admin: NavTab = {
  name: "Admin",
  icon: <MingcuteToolLine />,
  iconFill: <MingcuteToolFill />,
  path: "/admin",
  active: (url: string) => url === "/admin" || url.startsWith("/admin/"),
};

export const settings: NavTab = {
  name: "Settings",
  icon: <MingcuteSettings7Line />,
  iconFill: <MingcuteSettings7Fill />,
  path: "/settings",
  active: (url: string) => url === "/settings",
};

export const navTabs = [overview, admin, settings];
