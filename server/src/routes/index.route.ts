import { Hono } from "hono";
import { authRouter } from "./auth.route";
import { urlRouter } from "./url.route";
import { userRouter } from "./user.route";
import { verifyJWT } from "../middlewares/auth-middleware";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);
appRouter.route("/url", urlRouter);
appRouter.route("/user", userRouter);

export { appRouter };
