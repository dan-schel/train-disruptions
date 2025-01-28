import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { SimpleButton } from "../common/SimpleButton";
import { PageCenterer } from "../common/PageCenterer";
import { MaterialSymbolsChevronLeftRounded } from "../icons/MaterialSymbolsChevronLeftRounded";
import { Column } from "../core/Column";

export function Header() {
  const { name, hide } = usePageContext();

  if (hide) return null;

  return (
    <PageCenterer>
      <Column align="left" className="p-4">
        <SimpleButton
          onClick={() => window.history.back()}
          icon={<MaterialSymbolsChevronLeftRounded />}
          text={name}
        />
      </Column>
    </PageCenterer>
  );
}
