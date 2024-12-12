import { Hono } from "hono";
// import { csrf } from "hono/csrf";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

// router imports

import { appRouter } from "./routes";
import { simpleMiddleware } from "./middlewares/errorHandler";

const app = new Hono();

// middlewares
// app.use("/api/v1/auth", csrf());

app.use(logger());
app.use("/api/v1", etag({ weak: true }));

// routes
app.route("/api/v1/", appRouter);
app.get("/", (c) => c.text("hey from the server!"));

app.use("*", simpleMiddleware);

export default app;
