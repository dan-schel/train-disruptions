import {
  admin,
  navTabs,
  myCommute,
  NavTab,
  overview,
  settings as settingsTab,
} from "@/components/navigation/utils";
import { useSettings } from "@/hooks/useSettings";
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

export function NavBarOrchestrator(props: NavBarOrchestratorProps) {
  const [settings] = useSettings();
  const nonSettingsTabs = settings.showAdminTab
    ? [overview, myCommute, admin]
    : [overview, myCommute];

  const { urlPathname } = usePageContext();
  const loadedTab = navTabs.find((x) => x.active(urlPathname))?.name ?? null;
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
