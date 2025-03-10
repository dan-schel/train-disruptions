import React from "react";
import { PageCenterer } from "../common/PageCenterer";
import { SimpleButton } from "../common/SimpleButton";
import { Row } from "../core/Row";
import { With } from "../core/With";
import { MingcuteLeftLine } from "../icons/MingcuteLeftLine";

export type BackNavigationProps = {
  name: string;
  href: string;
};

export function BackNavigation(props: BackNavigationProps) {
  return (
    <With className="bg-surface border-b-action-secondary border-b md:border-b-0">
      <PageCenterer>
        <Row className="px-4 py-3 md:px-6 md:pt-4 md:pb-0">
          <SimpleButton
            icon={<MingcuteLeftLine />}
            text={props.name}
            href={props.href}
          />
        </Row>
      </PageCenterer>
    </With>
  );
}
