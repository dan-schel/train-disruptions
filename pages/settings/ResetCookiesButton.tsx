import React from "react";

import { SimpleButton } from "../../components/common/SimpleButton";
import { useSettings } from "../../hooks/useSettings";
import { Spacer } from "../../components/core/Spacer";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";

export function ResetCookiesButton() {
  const [cookiesReset, setCookiesReset] = React.useState(false);
  const { updateSettings } = useSettings();

  function handleResetCookies() {
    updateSettings((settings) =>
      settings.with({
        commute: null,
        hiddenCategories: [],
      }),
    );
    setCookiesReset(true);
  }

  return (
    <>
      <SimpleButton onClick={handleResetCookies} text="Reset Cookies" />
      {cookiesReset ? (
        <>
          <Spacer h="4" />
          <Column align="center">
            <Text style="regular">Cookies have been reset!</Text>
          </Column>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
