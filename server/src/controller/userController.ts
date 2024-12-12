import type { Context } from "hono";
import type { UserProfile } from "../types/userTypes";
import { db } from "../config/db";
import { organizeData } from "../utils/dataHandler";
import { ApiError } from "../utils/ApiError";
import { HttpStatusCode, Provider } from "../types/globalTypes";

const createUserProfile = async (c: Context) => {
	try {
		console.log("initiated");
		const rawBody = await c.req.formData();
		console.log(rawBody);

		const userProfile: UserProfile = {
			userId: rawBody.get("userId") as string,
			name: rawBody.get("name") as string,
			email: rawBody.get("email") as string,
			bio: rawBody.get("bio") as string,
			avatarUrl: rawBody.get("avatarUrl") as string,
			coverUrl: rawBody.get("coverUrl") as string,
			interests: rawBody.getAll("interests") as string[],
		};
		console.log(userProfile.interests);
		const user = organizeData(userProfile);

		const result = await db.userProfile.create({ data: user });
		if (!result) throw new Error("Unable to create user profile");
		console.log(result);
		console.log(user);

		return c.newResponse("User profile created successfully", 201);
	} catch (error: unknown) {
		throw new ApiError(
			Provider.Auth,
			"Unable to create user profile",
			400,
			error,
		);
	}
};

const sayhii = (c: Context) => {
	return c.text("Hello from the controller!");
};

const getUserProfile = async (c: Context) => {
	try {
		const userId = c.req.param("userId") as string;

		if (!userId || typeof userId !== "string") {
			return new ApiError(
				Provider.Auth,
				"Invalid user ID",
				HttpStatusCode.BadRequest,
			);
		}

		const userProfile = await db.userProfile.findUnique({ where: { userId } });

		if (!userProfile) {
			return new ApiError(
				Provider.Auth,
				"User profile not found",
				HttpStatusCode.NotFound,
			);
		}

		return c.json(
			{ message: "User found successfully", userProfile },
			HttpStatusCode.Ok,
		);
	} catch (error: unknown) {
		return new ApiError(
			Provider.Auth,
			`Unable to get user profile: ${error}`,
			HttpStatusCode.BadRequest,
			error,
		);
	}
};

export { createUserProfile, sayhii, getUserProfile };
