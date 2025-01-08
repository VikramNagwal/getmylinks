import { Hono } from "hono";
import { authRouter } from "./auth";
import { urlRouter } from "./url";

const appRouter = new Hono();

appRouter.route("/auth", authRouter);
appRouter.route("/url", urlRouter);

export { appRouter };
