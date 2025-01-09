import { Context, Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { dashboardApp } from "./queues/dashboard";
import "./queues/worker/email.worker";

const app = new Hono();

// router imports
import { appRouter } from "./routes";
import { HttpStatusCode } from "./types/types";
import { ShortUrlSchema } from "./schemas/link-schema";
import db from "./config/db";

// middlewares
app.use(logger());
app.use("/api/*", cors());
app.use("/api/v1", etag({ weak: true }));

// routes
app.route("/api/v1/", appRouter);
app.route("/admin/queues", dashboardApp);
app.get("/", (c) => c.text("hey from the server!"));
app.get("/:shorturl", async (c: Context) => {
    try {
        const shortUrl = ShortUrlSchema.parse(c.req.param("shorturl"));
        
        const response = await db.urlMapping.findUnique({
            where: {
                shortUrl
            },
            select: {
                longUrl: true,
                isActive: true,
                expiresAt: true,
            }
        })

        if (!response) {
            return c.json({
                success: false,
                message: "short url not found! Please check again",

            }, HttpStatusCode.NotFound)
        }
        return c.redirect(response?.longUrl)
    } catch (error) {
        return c.json(
            {
                success: false,
                isOperationl: true,
                message: "Error while redirecting to short url",
                error,
            },
            HttpStatusCode.InternalServerError,
        );
    }
})

export default app;
