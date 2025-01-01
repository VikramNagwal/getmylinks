import { Hono } from "hono";
import { userRouter } from "./users";
import { authRouter } from "./auth";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";

type Variables = JwtVariables;

const appRouter = new Hono<{ Variables: Variables }>();

const secret = String(process.env.ACCESS_TOKEN_SECRET);

appRouter.use("/user/*", jwt({ secret: secret }));

appRouter.route("/user", userRouter);
appRouter.route("/auth", authRouter);

export { appRouter };
