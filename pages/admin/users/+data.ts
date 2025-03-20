import { USERS } from "@/server/database/models/models";
import { JsonSerializable } from "@/shared/json-serializable";
import { PageContext } from "vike/types";
import { calculateUserDefaultAvatarIndex, User } from "discord.js";

export type Data = {
  admins: {
    id: string;
    username: string;
    role: "admin" | "super";
    discord: string | null;
  }[];
  discord: {
    id: string;
    username: string;
    avatar: string;
  }[];
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;
  const admins = await app.database.of(USERS).find({
    where: {
      role: "admin",
    },
  });
  let discord: User[] = [];
  if (app.discordBot) {
    discord = await app.discordBot.getMembers();
  }

  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    admins: admins.map(({ password, ...user }) => user),
    discord: discord
      .filter((user) => user.id === "184462953511256065")
      .filter((user) => admins.every((x) => x.discord !== user.id))
      .map(({ id, username, avatar }) => ({
        id,
        username,
        avatar: hashToSrc(id, avatar),
      })),
  };
}

function hashToSrc(id: string, avatar: string | null) {
  const baseURL = "https://cdn.discordapp.com/";
  if (!avatar) {
    return baseURL + `embed/avatars/${calculateUserDefaultAvatarIndex(id)}.png`;
  }

  return (
    baseURL +
    `avatars/${id}/${avatar}.${avatar.startsWith("a_") ? "gif" : "png"}`
  );
}
