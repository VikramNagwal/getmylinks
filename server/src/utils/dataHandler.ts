import { Provider } from './../types/globalTypes';
import { UserProfile } from "../types/userTypes";
import { ApiError } from "./errorHandler";


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
		console.log("Unable to organize user data", error);
		throw new ApiError(Provider.Data, "Unable to organize user data", 500, error);
	}
}
