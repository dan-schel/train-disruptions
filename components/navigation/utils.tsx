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

const overview: NavTab = {
  name: "Overview",
  icon: <MingcuteMapLine />,
  path: "/",
  active: (url: string) =>
    url === "/" || url.startsWith("/disruption") || url.startsWith("/line"),
};
const myCommute: NavTab = {
  name: "My commute",
  icon: <MingcuteArrowRightCircleLine />,
  path: "/commute",
  active: (url: string) => url === "/commute" || url.startsWith("/trip"),
};

const admin: NavTab = {
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

export function getNavTabs({
  includeSettings = false,
  includeAdmin = false,
}: {
  includeSettings?: boolean;
  includeAdmin?: boolean;
}) {
  const result = [overview, myCommute];
  if (includeAdmin) {
    result.push(admin);
  }
  if (includeSettings) {
    result.push(settings);
  }
  return result;
}
