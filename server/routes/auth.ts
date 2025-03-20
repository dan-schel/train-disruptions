import { App } from "@/server/app";
import { USERS } from "@/server/database/models/models";
import { SessionCookieName } from "@/server/routes/middleware/authentication";
import { validateMiddleware } from "@/server/routes/middleware/validate";
import { loginSchema } from "@/shared/types/auth";
import { compare } from "bcrypt";
import { Router } from "express";

export function createAuthRouter(app: App) {
  const authRouter = Router();

  authRouter.post(
    "/login",
    validateMiddleware({ body: loginSchema }),
    async (req, res, next) => {
      const { username, password } = req.body;

      const user = await app.database.of(USERS).first({ where: { username } });
      if (!user) {
        return res
          .status(403)
          .json({ error: "Username/password is incorrect" });
      }

      const isValid = await compare(password, user.password);
      if (!isValid) {
        return res
          .status(403)
          .json({ error: "Username/password is incorrect" });
      }

      req.session.regenerate((err) => {
        if (err) next(err);

        req.session.user = { id: user.id, role: user.role };

        req.session.save((err) => {
          if (err) next(err);
          res.redirect("/admin");
        });
      });
    },
  );

  authRouter.get("/logout", async (req, res, next) => {
    req.session.user = null;
    req.session.destroy((err) => {
      if (err) next(err);
      res.clearCookie(SessionCookieName, { path: "/" });
      res.redirect("/login");
    });
  });

  return authRouter;
}
