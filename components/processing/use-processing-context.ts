import { ProcessingContextData } from "@/shared/types/processing-context-data";
import React from "react";

export const ProcessingContext = React.createContext<
  { ready: false } | ProcessingContextData
>({
  ready: false,
});

export function useProcessingContext() {
  const result = React.useContext(ProcessingContext);

  if ("ready" in result) {
    throw new Error(
      "Attempting to use alert processing context outside <AlertProcessingContextProvider>.",
    );
  }

  return result;
}
