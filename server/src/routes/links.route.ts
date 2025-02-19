import db from "@lib/db";
import { Context, Hono } from "hono";
import { LinkSchema, ShortUrlSchema } from "@/schema/link-schema";
import { HttpStatusCode } from "@/types/global";
import { authenticateJWT } from "@/middlewares/auth-middleware";
import { getIdFromMiddleware } from "@/services/user-service";
import { logger } from "@utils/logger";
import linkService from "@/services/link-service";

const urlRouter = new Hono();

urlRouter.post("/shorten", authenticateJWT, async (c: Context) => {
	try {
		const createdById = await getIdFromMiddleware(c);
		const { url, title } = LinkSchema.parse(await c.req.json());
		logger.info(url, title); //remove this line

		const link = await linkService.createShortLink({
			url,
			title,
			userId: createdById,
		});

		return c.json(
			{
				success: true,
				message: "short link successfully generated",
				shortUrl: `http://localhost:8080/r/${link.shortUrl}`,
			},
			HttpStatusCode.Created,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "Error while shortening url",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

urlRouter.get("/stats/:shortUrl/", authenticateJWT, async (c: Context) => {
	try {
		const shortUrl = ShortUrlSchema.parse(c.req.param("shortUrl"));
		const stats = await db.link.findUnique({
			where: { shortUrl },
			select: {
				id: true,
				url: true,
				shortUrl: true,
				totalViews: true,
				createdAt: true,
			},
		});
		if (!stats)
			return c.json(
				{ message: "Short url not found" },
				HttpStatusCode.NotFound,
			);
		return c.json({
			success: true,
			stats,
		});
	} catch (error) {
		logger.error("Error while fetching analytics", error);
		return c.json(
			{
				success: false,
				message: "Error while fetching analytics",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

urlRouter.get("/:shortUrl/check", async (c: Context) => {
	try {
		const shortUrl = ShortUrlSchema.parse(c.req.param("shortUrl"));
		const response = await linkService.checkUrlExists(shortUrl);

		return c.json({
			available: !response,
		});
	} catch (error) {
		logger.error("Error while checking short url", error);
		return c.json(
			{
				success: false,
				message: "Internal server error",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

urlRouter.get("/links", authenticateJWT, async (c: Context) => {
	try {
		const userId = await getIdFromMiddleware(c);
		const links = await linkService.getAllLinks(userId);
		return c.json(
			{
				success: true,
				links,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "Error while fetching links",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

export { urlRouter };
