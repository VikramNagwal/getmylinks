import { Context, Next } from "hono";
import { arcjetSecurity } from "../utils/arcjet";
import { HttpStatusCode } from "../types/types";
import { logger } from "../config/loggerConfig";

export const security = async (c: Context, next: Next) => {
	try {
		const decision = await arcjetSecurity.protect(c.req.raw, { requested: 5 });
		logger.info(decision.conclusion);

		if (decision.isDenied()) {
			if (decision.reason.isRateLimit()) {
				return c.json(
					{ error: "Too many requests" },
					HttpStatusCode.TooManyRequests,
				);
			} else if (decision.reason.isBot()) {
				return c.json({ error: "No bots allowed" }, HttpStatusCode.Forbidden);
			} else {
				return c.json({ error: "Forbidden" }, HttpStatusCode.Forbidden);
			}
		}

		if (decision.reason.isBot() && decision.reason.isSpoofed()) {
			return c.json({ error: "Forbidden" }, HttpStatusCode.Forbidden);
		}

		return next();
	} catch (error) {
		return c.json(
			{ message: "Security vulnerability detected" },
			HttpStatusCode.Forbidden,
		);
	}
};
