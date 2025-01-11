import { Context, Hono } from "hono";
import { etag } from "hono/etag";
import db from "./config/db";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

const app = new Hono();

// router imports
import { appRouter } from "./routes";
import { HttpStatusCode } from "./types/types";
import { ShortUrlSchema } from "./schemas/link-schema";
import { verifyJWT } from "./middlewares/auth-middleware";
import { getUserDetails } from "./service/link-service";
import { dashboardApp } from "./queues/dashboard";
import { security } from "./middlewares/security-middleware";
import "./queues/worker/email.worker";
import { sentryMiddleware } from "./middlewares/sentry-middleware";

// middlewares
// app.use("*", security);  turn on security middleware
app.use("*", sentryMiddleware);
app.use(logger());
app.use("/api/*", cors());
app.use("/api/v1", etag({ weak: true }));

// routes
app.route("/api/v1/", appRouter);
app.route("/admin/queues", dashboardApp);
app.get("/", (c: Context) => c.text("Welcome to the URL shortener service"));
app.get("/error", (c: Context) => {
	return c.text("Error page");
});
app.get("/:shorturl", verifyJWT, async (c: Context) => {
	try {
		const shortUrl = ShortUrlSchema.parse(c.req.param("shorturl"));
		const userAgentInfo = getUserDetails(c.req);

		const response = await db.urlMapping.findUnique({
			where: { shortUrl },
			select: {
				id: true,
				longUrl: true,
				isActive: true,
				expiresAt: true,
			},
		});

		if (!response) {
			return c.json(
				{ message: "Short url not found" },
				HttpStatusCode.NotFound,
			);
		}

		if (!response.isActive) {
			return c.json(
				{ message: "Short url is not active" },
				HttpStatusCode.NoContent,
			);
		}

		if (response.expiresAt && new Date(response.expiresAt) < new Date()) {
			return c.json(
				{ message: "Short url has expired" },
				HttpStatusCode.NoContent,
			);
		}

		await db.$transaction(async (tx) => {
			await tx.urlMapping.update({
				where: {
					id: response.id,
				},
				data: { totalViews: { increment: 1 } },
			}),
				await tx.analytics.create({
					data: {
						urlId: response.id,
						...userAgentInfo,
					},
				});
		});

		return c.redirect(response.longUrl);
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
});

export default app;
