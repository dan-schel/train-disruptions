import React from "react";

import { Column } from "@/components/core/Column";
import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { Row } from "@/components/core/Row";
import { MingcuteDownLine } from "@/components/icons/MingcuteDownLine";
import { MingcuteUpLine } from "@/components/icons/MingcuteUpLine";

type CollapsibleProps = {
  label?: string;
  children: React.ReactElement;
};

export function Collapsible(props: CollapsibleProps) {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);

  const Icon = React.useMemo(
    () => (collapsed ? MingcuteDownLine : MingcuteUpLine),
    [collapsed],
  );

  return (
    <Column>
      <Button onClick={() => setCollapsed((prev) => !prev)}>
        <Row
          align="center"
          justify="space-between"
          className="bg-soft group-hover:bg-soft-hover group-active:bg-soft-active px-4 py-2"
        >
          <Text>{props.label}</Text>
          <Icon className="size-6" />
        </Row>
      </Button>
      {!collapsed && props.children}
    </Column>
  );
}
