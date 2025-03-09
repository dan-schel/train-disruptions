import React from "react";

import { SimpleButton } from "../../components/common/SimpleButton";
import { useSettings } from "../../hooks/useSettings";
import { Spacer } from "../../components/core/Spacer";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";

export function ResetCommuteButton() {
  const [commuteUpdated, setCommuteUpdated] = React.useState(false);
  const { updateSettings } = useSettings();

  function handleResetCookies() {
    updateSettings((settings) =>
      settings.with({
        commute: null,
      }),
    );
    setCommuteUpdated(true);
  }

  return (
    <>
      <SimpleButton onClick={handleResetCookies} text="Reset Commute" />
      {commuteUpdated ? (
        <>
          <Spacer h="4" />
          <Column align="center">
            <Text style="regular">Commute deleted!</Text>
          </Column>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
