import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { etag } from "hono/etag";

const app = new Hono();

// middlewares
app.use(csrf());
app.use("/api/v1/auth", etag({ weak: true }));

app.get("/", (c) => c.text("hey from the server!"));

export default app;
