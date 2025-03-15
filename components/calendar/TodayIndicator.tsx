import React from "react";

import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";

type Props = {
  column: number;
};

export const TodayIndicator = ({ column }: Props) => {
  return (
    <Grid columns="repeat(7, minmax(0, 1fr))" className="gap-1">
      <With gridColumn={column.toFixed()}>
        <div className="relative z-10 grid bg-black py-1 dark:bg-white">
          <Text
            oneLine
            style="custom"
            className="max-xs:text-[10px] text-xs font-medium text-white md:text-base dark:text-black"
            align="center"
          >
            TODAY
          </Text>

          {/* Triangle */}
          <div
            className={
              "absolute top-2 -z-10 size-4 rotate-45 place-self-center bg-inherit md:size-5"
            }
          />
        </div>
      </With>
    </Grid>
  );
};
