import { Hono } from "hono";
import { authRouter } from "./auth.route";
import { urlRouter } from "./links.route";
import { userRouter } from "./user.route";
import { checkRouter } from "./check.route";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);
appRouter.route("/url", urlRouter);
appRouter.route("/user", userRouter);
appRouter.route("/check", checkRouter);

export { appRouter };
