import { Hono } from "hono";
import { authRouter } from "./auth.route";
import { urlRouter } from "./links.route";
import { userRouter } from "./user.route";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);
appRouter.route("/url", urlRouter);
appRouter.route("/user", userRouter);

export { appRouter };
