import { Hono } from "hono";
import { userRouter } from "./users";
import { authRouter } from "./auth";
import { verifyJWT } from "../middlewares/auth.middleware";

const appRouter = new Hono();

appRouter.use("/user/*", verifyJWT)

appRouter.route("/user", userRouter);
appRouter.route("/auth", authRouter);

export { appRouter };
