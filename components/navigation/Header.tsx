import React from "react";
import { usePageContext } from "vike-react/usePageContext";

import { SimpleButton } from "../common/SimpleButton";
import { PageCenterer } from "../common/PageCenterer";
import { MaterialSymbolsChevronLeftRounded } from "../icons/MaterialSymbolsChevronLeftRounded";

export function Header() {
  const { name, hide } = usePageContext();

  if (hide) return null;

  return (
    <header className="grid bg-white py-2 max-lg:sticky max-lg:top-0 max-lg:z-10 max-lg:border max-lg:border-black">
      <PageCenterer>
        <SimpleButton
          onClick={() => window.history.back()}
          icon={<MaterialSymbolsChevronLeftRounded className="size-10" />}
          text={name}
          theme="header"
        />
      </PageCenterer>
    </header>
  );
}
