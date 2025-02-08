import { Context, Hono } from "hono";
import db from "./config/dbConfig";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import "./queues/worker/email.worker";

// router imports
import { appRouter } from "./routes/index.route";
import { HttpStatusCode } from "./@types/types";
import { ShortUrlSchema } from "./zod/link-schema";
import linkService, { getUserDetails } from "./services/link-service";
import { dashboardApp } from "./queues/dashboard";
import { security } from "./middlewares/security-middleware";
import { sentryMiddleware } from "./middlewares/sentry-middleware";

const app = new Hono();

// middlewares
// app.use("*", security);
// app.use("*", sentryMiddleware);
app.use(logger());
app.use(
	"*",
	cors({
		credentials: true,
		origin: "http://localhost:5173",
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowHeaders: ["Content-Type", "Authorization"],
		maxAge: 864000,
	}),
);

// routes
app.route("/api/v1/", appRouter);
app.route("/admin/queues", dashboardApp);
app.get("/", async (c: Context) => {
	return c.text("Welcome to the URL shortener service");
});
app.get("/r/:shorturl", async (c: Context) => {
	try {
		const shortUrl = ShortUrlSchema.parse(c.req.param("shorturl"));
		const userAgentInfo = getUserDetails(c.req);

		const response = await linkService.checkUrlExists(shortUrl);
		if (!response) {
			return c.json(
				{ message: "Short url not found" },
				HttpStatusCode.NotFound,
			);
		}

		await db.$transaction(async (tx) => {
			await tx.link.update({
				where: {
					id: response.id,
				},
				data: { totalViews: { increment: 1 } },
			}),
				await tx.analytics.create({
					data: {
						linkId: response.id,
						...userAgentInfo,
					},
				});
		});

		return c.redirect(response.url);
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
