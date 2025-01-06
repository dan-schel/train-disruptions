import React from "react";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { Link } from "../../components/core/Link";

export default function Page() {
  return (
    <Column className="gap-4 p-16" align="center">
      <Text style="title">Is It Buses?</Text>
      <Text style="custom" className="font-bold text-orange-700">
        Maybe.
      </Text>
      <Text>
        Lorem ipsum dolor sit{" "}
        <Link href="http://localhost:3000/">amet consectetur</Link>, adipisicing
        elit. Tenetur totam minima vel quas deserunt maxime, temporibus eos
        suscipit atque nesciunt cum ducimus dignissimos nemo consequuntur,
        placeat sapiente odio est enim.
      </Text>
      <Text>
        Lorem ipsum dolor sit{" "}
        <Link onClick={() => console.log("Hello.")}>amet consectetur</Link>,
        adipisicing elit. Tenetur totam minima vel quas deserunt maxime,
        temporibus eos suscipit atque nesciunt cum ducimus dignissimos nemo
        consequuntur, placeat sapiente odio est enim.
      </Text>
    </Column>
  );
}
