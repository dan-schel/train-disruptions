import React from "react";

import { AlertProcessingContext } from "@/components/alert-processing/use-alert-processing-context";
import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";

export type AlertProcessingContextProviderProps = {
  data: AlertProcessingContextData;
  children: React.ReactNode;
};

export function AlertProcessingContextProvider(
  props: AlertProcessingContextProviderProps,
) {
  return (
    <AlertProcessingContext.Provider value={props.data}>
      {props.children}
    </AlertProcessingContext.Provider>
  );
}
