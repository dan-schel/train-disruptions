import {
  admin,
  navTabs,
  myCommute,
  NavTab,
  overview,
  settings as settingsTab,
} from "@/components/navigation/utils";
import { useSettings } from "@/components/settings/use-settings";
import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

export type NavBarOrchestratorLayoutProps = {
  nonSettingsTabs: NavTab[];
  settingsTab: NavTab;
  isActiveTab: (tab: NavTab) => boolean;
  onTabClick: (tab: NavTab) => void;
};

export type NavBarOrchestratorProps = {
  Layout: (props: NavBarOrchestratorLayoutProps) => React.ReactNode;
};

/**
 * A helper component for the mobile & desktop nav bar. Manages the "instant"
 * navigation (a.k.a. not waiting for the new page to be fully loaded before
 * changing the active tab), and hiding the admin tab for regular users.
 */
export function NavBarOrchestrator(props: NavBarOrchestratorProps) {
  const [settings] = useSettings();
  const nonSettingsTabs = settings.showAdminTab
    ? [overview, myCommute, admin]
    : [overview, myCommute];

  const { urlPathname } = usePageContext();
  const pathname = urlPathname === "/" ? `/${settings.startPage}` : urlPathname;
  const loadedTab = navTabs.find((x) => x.active(pathname))?.name ?? null;
  const [activeTabName, setActiveTabName] = React.useState(loadedTab);

  React.useEffect(() => {
    setActiveTabName(loadedTab);
  }, [loadedTab]);

  function isActiveTab(tab: NavTab) {
    return activeTabName === tab.name;
  }

  function onTabClick(tab: NavTab) {
    // Don't rely on loadedTab to update, since it only updates when the new
    // page has loaded.
    setActiveTabName(tab.name);
    navigate(tab.path);
  }

  return props.Layout({
    nonSettingsTabs,
    settingsTab,
    isActiveTab,
    onTabClick,
  });
}
