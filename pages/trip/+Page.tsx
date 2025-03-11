import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/trip/+data";
import { DisplayTripPage } from "@/pages/trip/DisplayTripPage";
import { ChooseTripPage } from "@/pages/trip/ChooseTripPage";

export default function Page() {
  const data = useData<Data>();

  if (data.type === "display") {
    return <DisplayTripPage data={data} />;
  } else {
    return <ChooseTripPage data={data} />;
  }
}
