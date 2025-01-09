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
import { UAParser } from "ua-parser-js";

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
    const userAgent = c.req.header('User-Agent')
    const referer = c.req.header('referer')
    const ipAddress = c.req.header('x-forwarded-for') || c.req.header('x-real-ip')

    const parser = new UAParser(userAgent);
    const userAgentInfo = parser.getResult();

    const response = await db.urlMapping.findUnique({
      where: { shortUrl },
      select: {
        longUrl: true,
        isActive: true,
        expiresAt: true,
      },
    });

    if (!response) {
      return c.json({
        success: false,
        message: "short url not found! Please check again",
      }, HttpStatusCode.NotFound);
    }

    await db.clickEvent.create({
      data: {
        shortUrl,
        userAgent: userAgent || null,
        referer: referer || null,
        ipAddress: ipAddress || null,
        browser: userAgentInfo.browser.name || null,
        os: userAgentInfo.os.name || null,
        views: 1
      },
    });

    return c.redirect(response.longUrl);
  } catch (error) {
    return c.json({
      success: false,
      isOperationl: true,
      message: "Error while redirecting to short url",
      error,
    }, HttpStatusCode.InternalServerError);
  }
});

export default app;
