import React from "react";
import { SimpleButton } from "@/components/common/SimpleButton";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { MingcuteArrowRightLine } from "@/components/icons/MingcuteArrowRightLine";
import { Row } from "@/components/core/Row";
import { MingcuteCloseLine } from "@/components/icons/MingcuteCloseLine";
import { MingcuteCheckLine } from "@/components/icons/MingcuteCheckLine";
import { Spacer } from "@/components/core/Spacer";

export type ActiveQuestionProps = ActiveQuestionInnardsProps & {
  wrapInForm?: boolean;
};

export type ActiveQuestionInnardsProps = {
  label: string;
  children: React.ReactNode;
  error: string | null;
  isCancelable: boolean;
  onSubmit: () => void;
  onCancel: () => void;
};

export function ActiveQuestion(props: ActiveQuestionProps) {
  const { wrapInForm, ...innardsProps } = props;

  if (wrapInForm) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <ActiveQuestionInnards {...innardsProps} />
      </form>
    );
  } else {
    return <ActiveQuestionInnards {...innardsProps} />;
  }
}

function ActiveQuestionInnards(props: ActiveQuestionInnardsProps) {
  return (
    <Column align="left">
      <Text>{props.label}</Text>
      <Spacer h="2" />
      {props.children}
      {props.error && (
        <>
          <Spacer h="2" />
          <Text style="small-red">{props.error}</Text>
        </>
      )}
      <Spacer h="4" />
      <Row className="gap-2">
        {props.isCancelable && (
          <SimpleButton
            text="Cancel"
            icon={<MingcuteCloseLine />}
            onClick={props.onCancel}
          />
        )}
        <SimpleButton
          text={props.isCancelable ? "Update" : "Next"}
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
