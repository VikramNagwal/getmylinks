import { Context, Hono } from "hono";
import { logger } from "../config/loggerConfig";
import { checkUrlExists, createShortLink } from "../service/link-service";
import { LinkSchema, ShortUrlSchema } from "../schemas/link-schema";
import { HttpStatusCode } from "../types/types";
import { verifyJWT } from "../middlewares/auth-middleware";
import { getIdFromMiddleware } from "../service/user-service";
import { nanoid } from "nanoid";
import db from "../config/dbConfig";

const urlRouter = new Hono();

urlRouter.post("/shorten", verifyJWT, async (c: Context) => {
	try {
		const createdById = await getIdFromMiddleware(c);
		const { url, title } = LinkSchema.parse(await c.req.json());

		const shortCode = title || nanoid(8);
		const existingUrl = await checkUrlExists(url);
		if (existingUrl) {
			return c.json(
				{
					message: "Short url already exists",
					shortUrl: `http://localhost:8080/${existingUrl}`,
				},
				HttpStatusCode.Ok,
			);
		}
		await db.url.create({
			data: {
				longUrl: url,
				shortUrl: shortCode,
				createdById,
			},
		});

		return c.json(
			{
				message: "creared",
				shortUrl: `http://localhost:8080/${shortCode}`,
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

urlRouter.get("/:shortUrl/analytics", verifyJWT, async (c: Context) => {
	try {
		const shortUrl = ShortUrlSchema.parse(c.req.param("shortUrl"));

		// complte here
	} catch (error) {
		logger.error("Error while fetching analytics", error);
		return c.json(
			{
				success: false,
				isOperationl: true,
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
		const response = await checkUrlExists(shortUrl);

		return c.json({
			available: !response,
		});
	} catch (error) {
		logger.error("Error while checking short url", error);
		return c.json(
			{
				success: false,
				isOperationl: true,
				message: "Url not found",
				available: false,
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

export { urlRouter };
