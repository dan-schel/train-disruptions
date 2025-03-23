import React from "react";

import { SimpleButton } from "@/components/common/SimpleButton";
import { Spacer } from "@/components/core/Spacer";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { useSettings } from "@/hooks/useSettings";

export type SettingsCommuteProps = {
  stations: {
    id: number;
    name: string;
  }[];
};

export function SettingsCommute({ stations }: SettingsCommuteProps) {
  const [settings, setSettings] = useSettings();

  function handleResetCookies() {
    setSettings(settings.with({ commute: null, startPage: "overview" }));
  }

  return (
    <Column align="left">
      <Text style="subtitle">Commute</Text>
      <Spacer h="4" />
      {settings.commute == null ? (
        <Text>No commute set.</Text>
      ) : (
        <ResetCommuteButton
          commuteA={settings.commute.a}
          commuteB={settings.commute.b}
          stations={stations}
          handleResetCookies={handleResetCookies}
        />
      )}
    </Column>
  );
}

type ResetCommuteButtonProps = {
  commuteA: number;
  commuteB: number;
  stations: {
    id: number;
    name: string;
  }[];
  handleResetCookies: () => void;
};

function ResetCommuteButton({
  commuteA,
  commuteB,
  stations,
  handleResetCookies,
}: ResetCommuteButtonProps) {
  return (
    <>
      <Text>
        Your commute is from{" "}
        <b>{stations.find((x) => x.id === commuteA)?.name}</b> to{" "}
        <b>{stations.find((x) => x.id === commuteB)?.name}</b>.
      </Text>
      <Spacer h="4" />
      <SimpleButton onClick={handleResetCookies} text="Reset commute" />
    </>
  );
}
