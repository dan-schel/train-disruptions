import { z } from "zod";
import { hash } from "bcrypt";
import { Router } from "express";
import { App } from "@/server/app";
import { randomFillSync } from "crypto";
import { uuid } from "@dan-schel/js-utils";
import { Admin } from "@/server/database/models/user";
import { ADMINS } from "@/server/database/models/models";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { isAuthenticated } from "@/server/routes/middleware/authentication";

export function createAdminRouter(app: App) {
  const adminRouter = Router();

  /**
   * Creates a new admin user and sends them their crendentials via Discord
   */
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

      let existing = await app.database.of(ADMINS).first({
        where: {
          discord: id,
        },
      });
      if (existing) {
        return res.status(409).json({
          error: "A user is already associated with this Discord account",
        });
      }

      existing = await app.database.of(ADMINS).first({
        where: {
          username,
        },
      });
      if (existing) {
        return res.status(409).json({
          error: "Username unavailable",
        });
      }

      const password = generatePassword();
      const hashedPW = await hash(password, 10);
      const user = new Admin(uuid(), username, hashedPW, "admin", id);
      await app.database.of(ADMINS).create(user);

      await app.discordBot.inviteAdmin(
        id,
        username,
        password,
        `${req.protocol}://${req.hostname}${req.hostname === "localhost" ? ":3000" : ""}`,
      );

      return res.json();
    },
  );

  /**
   * Update the current users's account details
   */
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
          error: "You cannot update someone else's credentials.",
        });
      }

      const user = await app.database.of(ADMINS).get(id);
      if (!user) {
        return res.status(401).json({ error: "Not authorized" });
      }

      const existingUsername = await app.database
        .of(ADMINS)
        .first({ where: { username } });
      if (existingUsername && existingUsername.id !== user.id) {
        return res.status(409).json({
          error: "Username unavailable",
        });
      }

      let hashedPW = null;
      if (password) {
        hashedPW = await hash(password, 10);
      }

      await app.database.of(ADMINS).update({
        ...user,
        username,
        password: hashedPW ?? user.password,
      });

      return res.json();
    },
  );

  /**
   * Deletes a user
   */
  adminRouter.delete(
    "/users/:id",
    isAuthenticated,
    validateMiddleware({
      params: z.object({
        id: z.string(),
      }),
    }),
    async (req, res) => {
      const { id } = req.params;

      if (req.session.user?.id === id) {
        return res.status(409).json({ error: "You cannot delete yourself" });
      }

      if (req.session.user?.role === "admin") {
        return res.status(403).json({ error: "Insufficient privileges" });
      }

      const admin = await app.database.of(ADMINS).get(id);
      if (!admin || admin.role === "super") {
        return res.status(404).json({ error: "Admin doesn't exist" });
      }

      await app.database.of(ADMINS).delete(admin.id);

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
  Array.from(randomFillSync(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join("");
