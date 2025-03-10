import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { useSettings } from "../../hooks/useSettings";
import { SimpleButton } from "../../components/common/SimpleButton";

export default function Page() {
  const { fetchSettings, updateSettings } = useSettings();

  return (
    <PageCenterer>
      <PagePadding>
        <Column className="gap-5">
          <Text style="title">Settings</Text>

          {/* TEMP - for debugging/test */}
          <SimpleButton
            onClick={() => {
              updateSettings((s) =>
                s.with({
                  theme: fetchSettings().theme === "dark" ? "light" : "dark",
                }),
              );
              // Since the theme is not stored in a state, we have to reload for it to take effect
              window.location.reload();
            }}
            text="Toggle theme"
          />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
