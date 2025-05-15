import React from "react";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { MingcuteArrowRightLine } from "@/components/icons/MingcuteArrowRightLine";
import { Row } from "@/components/core/Row";
import { MingcuteCloseLine } from "@/components/icons/MingcuteCloseLine";
import { MingcuteCheckLine } from "@/components/icons/MingcuteCheckLine";

export type ActiveQuestionProps = {
  label: string;
  children: React.ReactNode;
  error: string | null;
  isCancelable: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ActiveQuestion(props: ActiveQuestionProps) {
  // TODO: [DS] Prop to wrap everything in a form to get enter key submission.
  return (
    <Column align="left" className="gap-2">
      <Text>{props.label}</Text>
      {props.children}
      {props.error && <Text style="small-red">{props.error}</Text>}
      <Row className="gap-2">
        {props.isCancelable && (
          <SimpleButton
            text="Cancel"
            icon={<MingcuteCloseLine />}
            onClick={props.onCancel}
          />
        )}
        <SimpleButton
          text={props.isCancelable ? "Update" : "Continue"}
          icon={
            props.isCancelable ? (
              <MingcuteCheckLine />
            ) : (
              <MingcuteArrowRightLine />
            )
          }
          onClick={props.onSubmit}
          theme="primary"
        />
      </Row>
    </Column>
  );
}
