import { Hono } from "hono";
import { userRouter } from "./users";

const appRouter = new Hono();

appRouter.route("/user", userRouter);

export { appRouter };
