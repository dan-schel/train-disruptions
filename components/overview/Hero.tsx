import React from "react";
import { Text } from "@/components/core/Text";
import { Favicon } from "@/components/icons/Favicon";
import { With } from "@/components/core/With";

export function Hero() {
  return (
    <div className="flex flex-col items-center gap-4 py-12 md:flex-row">
      <With className="text-5xl">
        <Favicon />
      </With>
      <div className="flex flex-col items-center gap-2 md:items-start">
        <Text style="megatitle">Is it buses?</Text>
        <Text>Melbourne&apos;s train disruptions, visualised</Text>
      </div>
    </div>
  );
}
