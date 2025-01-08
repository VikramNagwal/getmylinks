import { Context, Hono } from "hono";
import { logger } from "../config/logger";
import { ApiError } from "../utils/error-handler";
import { createShortLink } from "../service/link-service";
import db from "../config/db";
import { LinkSchema } from "../schemas/link-schema";
import { HttpStatusCode } from "../types/types";
import { verifyJWT } from "../middlewares/auth.middleware";

const urlRouter = new Hono();

urlRouter.post("/shorten", verifyJWT, async (c: Context) => {
	try {
		const body = await c.req.parseBody();
		const { url, title } = LinkSchema.parse(body);
		console.log('url', url, title)

		const shortUrl = await createShortLink(url, title);

		return c.json({
			success: true,
			message: "created shorted url",
			data: {
				shortUrl
			}

		}, HttpStatusCode.Created)
		
	} catch (error) {
		logger.error("Error while shortening url", error);
		return c.json({
			success: false,
			isOperationl: true,
			message: "Error while shortening url",
			error,
		}, HttpStatusCode.InternalServerError)
	}
});

export { urlRouter };
