import { Hono } from "hono";
import { userRouter } from "./users";
import { authRouter } from "./auth";

const appRouter = new Hono();

appRouter.route("/user", userRouter);
appRouter.route("/auth", authRouter);

export { appRouter };
