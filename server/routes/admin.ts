import { App } from "@/server/app";
import { USERS } from "@/server/database/models/models";
import { User } from "@/server/database/models/user";
import { isAuthenticated } from "@/server/routes/middleware/authentication";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { uuid } from "@dan-schel/js-utils";
import { Router } from "express";
import { z } from "zod";
import * as crypto from "crypto";
import { hash } from "bcrypt";

export function createAdminRouter(app: App) {
  const adminRouter = Router();

  adminRouter.post(
    "/users",
    isAuthenticated,
    validateMiddleware({ body: schema }),
    async (req, res) => {
      const { id, username } = req.body;

      if (!app.discordBot) {
        return res.status(412).json({
          error:
            "Discord bot is unavailable at this moment. Try again at another time.",
        });
      }

      let existing = await app.database.of(USERS).first({
        where: {
          discord: id,
        },
      });
      if (existing) {
        return res.status(409).json({
          error: "A user is already associated with this Discord account",
        });
      }

      existing = await app.database.of(USERS).first({
        where: {
          username,
        },
      });
      if (existing) {
        return res.status(409).json({
          error: "A user is already associated with this username",
        });
      }

      const password = generatePassword();
      const hashedPW = await hash(password, 10);
      const user = new User(uuid(), username, hashedPW, "admin", id);
      await app.database.of(USERS).create(user);

      await app.discordBot.inviteMember(
        id,
        username,
        password,
        `${req.protocol}://${req.hostname}${req.hostname === "localhost" ? ":3000" : ""}`,
      );

      return res.send();
    },
  );

  return adminRouter;
}

const schema = z.object({
  id: z.string().nonempty(),
  username: z.string().nonempty(),
});

// Not intended on being complicated, users should change their password when once they login
// Source: https://stackoverflow.com/a/51540480
const generatePassword = (
  length = 16,
  characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$",
) =>
  Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");
