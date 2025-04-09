import React from "react";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { Button } from "@/components/core/Button";
import { MingcuteRightLine } from "@/components/icons/MingcuteRightLine";
import { Grid } from "@/components/core/Grid";

type AlertButtonProps = {
  action: string | (() => void);
  title: string;
  id: string;
};

export function AlertButton({ action, title, id }: AlertButtonProps) {
  return (
    <Button
      {...(typeof action === "string" ? { href: action } : { onClick: action })}
    >
      <Grid
        columns="1fr auto"
        align="center"
        className="group-hover:bg-soft-hover group-active:bg-soft-active rounded"
      >
        <Column className="gap-3">
          <Text>{title}</Text>
          <Text>#{id}</Text>
        </Column>
        <MingcuteRightLine />
      </Grid>
    </Button>
  );
}
