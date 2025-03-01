import React from "react";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { DisplayTripPage } from "./DisplayTripPage";
import { ChooseTripPage } from "./ChooseTripPage";

export default function Page() {
  const data = useData<Data>();

  if (data.type === "display") {
    return <DisplayTripPage data={data} />;
  } else {
    return <ChooseTripPage data={data} />;
  }
}
