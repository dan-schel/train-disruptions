import React from "react";

import { ProcessingContext } from "@/components/processing/use-processing-context";
import { ProcessingContextData } from "@/shared/types/processing-context-data";

export type ProcessingContextProviderProps = {
  data: ProcessingContextData;
  children: React.ReactNode;
};

export function ProcessingContextProvider(
  props: ProcessingContextProviderProps,
) {
  return (
    <ProcessingContext.Provider value={props.data}>
      {props.children}
    </ProcessingContext.Provider>
  );
}
