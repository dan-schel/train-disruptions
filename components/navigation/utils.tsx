import React from "react";
import { MingcuteArrowRightCircleLine } from "@/components/icons/MingcuteArrowRightCircleLine";
import { MingcuteMapLine } from "@/components/icons/MingcuteMapLine";
import { MingcuteToolLine } from "@/components/icons/MingcuteToolLine";
import { MingcuteSettings7Line } from "@/components/icons/MingcuteSettings7Line";
import { MingcuteMapFill } from "@/components/icons/MingcuteMapFill";
import { MingcuteArrowRightCircleFill } from "@/components/icons/MingcuteArrowRightCircleFill";
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
  path: "/overview",
  active: (url: string) =>
    url === "/overview" ||
    url.startsWith("/disruption") ||
    url.startsWith("/line"),
};

export const myCommute: NavTab = {
  name: "My commute",
  icon: <MingcuteArrowRightCircleLine />,
  iconFill: <MingcuteArrowRightCircleFill />,
  path: "/commute",
  active: (url: string) => url === "/commute" || url.startsWith("/trip"),
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

export const navTabs = [overview, myCommute, admin, settings];
