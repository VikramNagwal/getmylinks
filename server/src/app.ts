import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { dashboardApp } from "./queues/dashboard";
import "./queues/worker/email.worker";

const app = new Hono();

// router imports
import { appRouter } from "./routes";

// middlewares
app.use(logger());
app.use("/api/*", cors());
app.use("/api/v1", etag({ weak: true }));

// routes
app.route("/api/v1/", appRouter);
app.route("/admin/queues", dashboardApp);
app.get("/", (c) => c.text("hey from the server!"));

export default app;
