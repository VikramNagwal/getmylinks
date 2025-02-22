import { Hono } from "hono";
import { authRouter } from "./auth.route";
import { urlRouter } from "./links.route";
import { userRouter } from "./account.route";
import { checkRouter } from "./check.route";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);
appRouter.route("/url", urlRouter);
appRouter.route("/account", userRouter);
appRouter.route("/checks", checkRouter);

export { appRouter };
