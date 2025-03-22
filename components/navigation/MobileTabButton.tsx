import React, { useEffect, useState } from "react";
import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { admin, NavTab, settings } from "@/components/navigation/utils";
import { usePageContext } from "vike-react/usePageContext";
import { Column } from "@/components/core/Column";

export type MobileTabButtonProps = {
  tab: NavTab;
};

export function MobileTabButton(props: MobileTabButtonProps) {
  const { urlPathname } = usePageContext();

  // TODO: [DS] Temporary.
  const { showAdminTab, incrementCount } = {
    showAdminTab: true,
    incrementCount: () => {},
  };

  const [hidden, setHidden] = useState<boolean>(props.tab === admin);
  const active = props.tab.active(urlPathname);

  useEffect(() => {
    setHidden(!showAdminTab && props.tab === admin && !active);
  }, [active, props.tab, showAdminTab]);

  const action =
    active && props.tab === settings
      ? { onClick: incrementCount }
      : { href: props.tab.path };

  return (
    <Button {...action} hidden={hidden}>
      <Column className={clsx("h-16 gap-1")} align="center" justify="center">
        <With
          className={clsx("-mt-1 rounded-full px-4 py-1 text-xl", {
            "bg-action text-active": active,
          })}
        >
          {active ? props.tab.iconFill : props.tab.icon}
        </With>
        <Text
          style={active ? "mobile-nav-bar-active" : "mobile-nav-bar"}
          oneLine
        >
          {props.tab.name}
        </Text>
      </Column>
    </Button>
  );
}
