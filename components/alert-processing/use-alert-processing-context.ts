import { AlertProcessingContextData } from "@/shared/types/alert-processing-context-data";
import React from "react";

export const AlertProcessingContext = React.createContext<
  { ready: false } | AlertProcessingContextData
>({
  ready: false,
});

export function useAlertProcessingContext() {
  const result = React.useContext(AlertProcessingContext);

  if ("ready" in result) {
    throw new Error(
      "Attempting to use alert processing context outside <AlertProcessingContextProvider>.",
    );
  }

  return result;
}
