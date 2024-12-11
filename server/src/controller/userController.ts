import type { Context } from "hono";
import type { UserProfile } from "../types/userTypes";
import { db } from "../config/db";
import { organizeData } from "../utils/dataHandler";

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
	} catch (error: any) {
		throw c.json({ error: error.message }, 400);
	}
};

const sayhii = (c: Context) => {
	return c.text("Hello from the controller!");
};

const getUserProfile = async (c: Context) => {
	try {
		const userId = c.req.param("userId") as string;
		const userProfile = await db.userProfile.findUnique({ where: { userId } });
		if (!userProfile) throw new Error("User profile not found");
		c.newResponse("user found successfully", 200);
		return c.json({ userProfile }, 200);
	} catch (error: any) {
		throw c.json({ error: error.message }, 404);
	}
};

export { createUserProfile, sayhii, getUserProfile };
