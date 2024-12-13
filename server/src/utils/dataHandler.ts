import { HttpStatusCode, Provider } from "./../types/globalTypes";
import type { UserProfile } from "../types/userTypes";
import { logger } from "../config/logger";

export function organizeData(data: UserProfile) {
	console.log("od");
	try {
		if (!(data.email && data.userId && data.name))
			console.log("Data is missing required fields", data);

		return {
			userId: data.userId.trim().toLowerCase(),
			name: data.name.trim().toLowerCase(),
			email: data.email.trim().toLowerCase(),
			bio: data.bio?.trim().toLowerCase(),
			avatarUrl: data.avatarUrl?.trim().toLowerCase(),
			coverUrl: data.coverUrl?.trim().toLowerCase(),
			interests: data.interests.map((interest) =>
				interest.trim().toLowerCase(),
			),
		};
	} catch (error) {
		logger.error(`Error in organizeData: ${error}`);
		return {
			error: "Unable to organize data",
			status: HttpStatusCode.InternalServerError,
			fault: [error],
			isOperational: true,
		};
	}
}
