import { Context, Hono } from "hono";
import { logger } from "../config/logger";
import { ApiError } from "../utils/error-handler";

const urlRouter = new Hono();

urlRouter.get("/shorten", async (c: Context) => {
	const body = await c.req.parseBody();
	const { url, custom } = body;
	if (!url) return c.json(ApiError.notFound("Url is required!"));

	try {
		// const shortUrl = await
	} catch (error) {
		logger.error("Unable to short url! Please try again later", error);
		c.json(
			new ApiError(
				"Unable to short url! Please try again later",
				500,
				true,
				error,
			),
		);
	}
});

export { urlRouter };
