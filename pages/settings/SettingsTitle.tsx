import React, { useEffect } from "react";

import { Button } from "@/components/core/Button";
import { Text } from "@/components/core/Text";
import { With } from "@/components/core/With";

const clicksRequired = 5;

export type SettingsTitleProps = {
  onRepeatedClicks: () => void;
};

export function SettingsTitle(props: SettingsTitleProps) {
  const [clicks, setClicks] = React.useState(0);

  function handleClick() {
    setClicks((clicks) => clicks + 1);
  }

  useEffect(() => {
    if (clicks >= clicksRequired) {
      setClicks(0);
      props.onRepeatedClicks();
    }
  }, [props, clicks]);

  return (
    <With className="self-start">
      <Button onClick={handleClick}>
        <Text style="megatitle">Settings</Text>
      </Button>
    </With>
  );
}
