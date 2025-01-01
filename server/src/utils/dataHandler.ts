import { HttpStatusCode } from "../types/types";
import * as logger from "../config/logger";
import { UserProfile } from "../types/types";

export function organizeData(data: UserProfile) {
	const requiredFields = ["email", "userId", "name"] as const;
	const missingFields = requiredFields.filter(
		(field): field is typeof field => !(field in data) || !data[field],
	);

	if (missingFields.length > 0) {
		logger.logger.error(`Missing required fields: ${missingFields.join(", ")}`);
		return {
			error: `Missing required fields: ${missingFields.join(", ")}`,
			status: HttpStatusCode.BadRequest,
			fault: missingFields,
			isOperational: true,
		};
	}

	try {
		const {
			userId,
			name,
			email,
			bio = "",
			avatarUrl = "no",
			coverUrl = "no",
			interests = [],
		} = data;

		// Centralized sanitization method
		const sanitize = (value: string | undefined) =>
			value ? value.trim().toLowerCase() : "no";

		return {
			userId: sanitize(userId),
			name: sanitize(name),
			email: sanitize(email),
			bio: sanitize(bio),
			avatarUrl: sanitize(avatarUrl),
			coverUrl: sanitize(coverUrl),
			interests:
				interests.length > 0
					? interests.map(sanitize).filter(Boolean)
					: ["no interests"],
		};
	} catch (error) {
		logger.logger.error(`Error in organizeData: ${error}`);
		return {
			error: "Unable to organize data",
			status: HttpStatusCode.InternalServerError,
			fault: [error],
			isOperational: true,
		};
	}
}
