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
    validateMiddleware({
      body: z.object({
        id: z.string().nonempty(),
        username: z.string().nonempty(),
      }),
    }),
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

      return res.json();
    },
  );

  adminRouter.put(
    "/users/:id",
    isAuthenticated,
    validateMiddleware({
      body: z.object({
        username: z.string(),
        password: z.string().optional(),
      }),
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res) => {
      const { id } = req.params;
      const { username, password } = req.body;

      if (req.session.user?.id !== id) {
        return res.status(403).json({
          error:
            "You cannot update the credentials of an other user's account.",
        });
      }

      const user = await app.database.of(USERS).get(id);
      if (!user) {
        return res.status(401).json({ error: "Not authorized" });
      }

      const existingUsername = await app.database
        .of(USERS)
        .first({ where: { username } });
      if (existingUsername && existingUsername.id !== user.id) {
        return res.status(409).json({
          error: "This username is associated already with another account",
        });
      }

      let hashedPW = null;
      if (password) {
        hashedPW = await hash(password, 10);
      }

      await app.database.of(USERS).update({
        ...user,
        username,
        password: hashedPW ?? user.password,
      });

      return res.json();
    },
  );

  return adminRouter;
}

// Not intended on being complicated, users should change their password when once they login
// Source: https://stackoverflow.com/a/51540480
const generatePassword = (
  length = 16,
  characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$",
) =>
  Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");
