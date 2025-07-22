import React from "react";

import { AlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";
import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";

export type SettingsProviderProps = {
  data: AlertProcessingContextData;
  children: React.ReactNode;
};

export function SettingsProvider(props: SettingsProviderProps) {
  return (
    <AlertProcessingContext.Provider value={props.data}>
      {props.children}
    </AlertProcessingContext.Provider>
  );
}
