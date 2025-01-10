import { Context, Hono } from "hono";
import { logger } from "../config/logger";
import { createShortLink } from "../service/link-service";
import { LinkSchema } from "../schemas/link-schema";
import { HttpStatusCode } from "../types/types";
import { verifyJWT } from "../middlewares/auth.middleware";


const urlRouter = new Hono();

urlRouter.post("/shorten", verifyJWT, async (c: Context) => {
	try {
		const body = await c.req.parseBody();
		const { url, title } = LinkSchema.parse(body);

		const shortUrl = await createShortLink(url, title);

		return c.json(
			{
				success: true,
				message: "created shorted url",
				data: {
					shortUrl: `${Bun.env.FRONTEND_URL}/${shortUrl}`, // <-- FRONTEND URL CODE <-
				},
			},
			HttpStatusCode.Created,
		);
	} catch (error) {
		logger.error("Error while shortening url", error);
		return c.json(
			{
				success: false,
				isOperationl: true,
				message: "Error while shortening url",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

urlRouter.get("/:shortUrl/analytics", async (c: Context) => {});

export { urlRouter };
