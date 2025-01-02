import { Hono } from "hono";
import { authRouter } from "./auth";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);

export { appRouter };
