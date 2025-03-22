import React, { useEffect, useState } from "react";
import { Button } from "@/components/core/Button";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
import clsx from "clsx";
import { admin, NavTab, settings } from "@/components/navigation/utils";
import { usePageContext } from "vike-react/usePageContext";
import { useAdminVisibilityContext } from "@/context/AdminVisibility";

export type DesktopTabButtonProps = {
  tab: NavTab;
};

export function DesktopTabButton(props: DesktopTabButtonProps) {
  const { urlPathname } = usePageContext();
  const { showAdminTab, incrementCount } = useAdminVisibilityContext();
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
      <Row
        className={clsx(
          "group-hover:bg-soft-hover group-active:bg-soft-active h-12 gap-2 border-y-2 border-transparent px-4",
          { "border-b-accent": active },
        )}
        align="center"
      >
        <With className="-ml-0.5 text-lg">{props.tab.icon}</With>
        <Text>{props.tab.name}</Text>
      </Row>
    </Button>
  );
}
