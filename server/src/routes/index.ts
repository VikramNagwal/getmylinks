import { Hono } from "hono";
import { authRouter } from "./auth";
import { urlRouter } from "./url";
import { userRouter } from "./user";
import { verifyJWT } from "../middlewares/auth-middleware";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);
appRouter.route("/url", urlRouter);
appRouter.route("/user", userRouter);

export { appRouter };
