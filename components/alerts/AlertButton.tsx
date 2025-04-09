import React from "react";

import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";
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
        <Text>{title}</Text>
        <With gridColumn="1" gridRow="2" className="py-3">
          <Text>#{id}</Text>
        </With>
        <With gridColumn="2" gridRow="1">
          <MingcuteRightLine className="size-6" />
        </With>
      </Grid>
    </Button>
  );
}
