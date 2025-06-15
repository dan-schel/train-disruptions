import React from "react";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Column } from "@/components/core/Column";
import { Grid } from "@/components/core/Grid";
import { Text } from "@/components/core/Text";
import { MingcuteEdit3Line } from "@/components/icons/MingcuteEdit3Line";

export type SubmittedQuestionProps = {
  label: string;
  value: string;
  onEditClick: () => void;
};

export function SubmittedQuestion(props: SubmittedQuestionProps) {
  return (
    <Grid columns="1fr auto">
      <Column className="gap-2">
        <Text>{props.label}</Text>
        <Text>{props.value}</Text>
      </Column>
      <SimpleButton
        icon={<MingcuteEdit3Line />}
        alt="Edit"
        onClick={props.onEditClick}
      />
    </Grid>
  );
}
