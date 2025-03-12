import React from "react";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { useSettings } from "@/hooks/useSettings";
import { SimpleButton } from "@/components/common/SimpleButton";

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
              const isDark = fetchSettings().theme === "dark";
              updateSettings((s) =>
                s.with({
                  theme: isDark ? "light" : "dark",
                }),
              );

              // To set the theme to `system` preference, set the className to "";
              document.documentElement.className = isDark ? "light" : "dark";
            }}
            text="Toggle theme"
          />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
