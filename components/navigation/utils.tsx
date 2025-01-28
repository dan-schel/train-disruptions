import React from "react";
import { MingcuteArrowRightCircleLine } from "../icons/MingcuteArrowRightCircleLine";
import { MingcuteMapLine } from "../icons/MingcuteMapLine";
import { MingcuteToolLine } from "../icons/MingcuteToolLine";
import { MingcuteSettings7Line } from "../icons/MingcuteSettings7Line";

export type NavTab = {
  name: string;
  icon: React.ReactElement;
  path: string;
  active: (url: string) => boolean;
};

export const overview: NavTab = {
  name: "Overview",
  icon: <MingcuteMapLine />,
  path: "/",
  active: (url: string) =>
    url === "/" || url.startsWith("/disruption") || url.startsWith("/line"),
};

export const myCommute: NavTab = {
  name: "My commute",
  icon: <MingcuteArrowRightCircleLine />,
  path: "/commute",
  active: (url: string) => url === "/commute" || url.startsWith("/trip"),
};

export const admin: NavTab = {
  name: "Admin",
  icon: <MingcuteToolLine />,
  path: "/admin",
  active: (url: string) => url === "/admin",
};

export const settings: NavTab = {
  name: "Settings",
  icon: <MingcuteSettings7Line />,
  path: "/settings",
  active: (url: string) => url === "/settings",
};
