import { Context, Hono } from "hono";
import db from "@lib/db";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import "./queues/worker/email.worker";

// router imports
import { appRouter } from "./routes/index.route";
import { HttpStatusCode } from "./types/global";
import { ShortUrlSchema } from "./schema/link-schema";
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
app.notFound((c: Context) => c.json({ message: "Not Found", ok: false }, 404));


app.route("/api/v1/", appRouter);
app.route("/admin/queues", dashboardApp);

// main short url router
app.get("/r/:shortId", async (c: Context) => {
	try {
		const shortUrl = ShortUrlSchema.parse(c.req.param("shortId"));
		const userAgentInfo = getUserDetails(c.req);

		const link = await linkService.checkUrlExists(shortUrl);

		if (!link) {
			return c.json(
				{ message: "Short url not found" },
				HttpStatusCode.NotFound,
			);
		}

		await db.$transaction(async (tx) => {
			await tx.link.update({
				where: {
					id: link.id,
				},
				data: { totalViews: { increment: 1 } },
			}),
				await tx.analytics.create({
					data: {
						linkId: link.id,
						...userAgentInfo,
					},
				});
		});

		return c.redirect(link.url); //redirection
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "Error while redirecting to short url",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

export default app;
