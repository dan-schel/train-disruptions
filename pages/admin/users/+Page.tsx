import React from "react";

import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { Column } from "@/components/core/Column";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/users/+data";
import { Row } from "@/components/core/Row";
import { Text } from "@/components/core/Text";
import { BackNavigation } from "@/components/navigation/BackNavigation";
import { DiscordUser } from "@/pages/admin/users/DiscordUser";
import { With } from "@/components/core/With";

export default function Page() {
  const { discord, admins } = useData<Data>();

  return (
    <Column>
      <BackNavigation name="Admin" href="/admin" />
      <PageCenterer>
        <PagePadding>
          <Column className="gap-6">
            <Column className="gap-2">
              <Text style="subtitle">Conductors</Text>
              {!admins.length && (
                <With className="p-5">
                  <Text align="center">
                    No one&apos;s here to help onboard our commuters, maybe one
                    of them could help us out
                  </Text>
                </With>
              )}
              {admins.map((user) => (
                <Row key={user.id} align="center" className="h-10 p-2">
                  <Text>{user.username}</Text>
                </Row>
              ))}
            </Column>

            <Column className="gap-2">
              <Text style="subtitle">Commuters</Text>
              {discord.map((user) => (
                <DiscordUser key={user.id} user={user} />
              ))}
            </Column>
          </Column>
        </PagePadding>
      </PageCenterer>
    </Column>
  );
}
