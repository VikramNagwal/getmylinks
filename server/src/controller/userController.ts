import type { Context } from "hono";
import type { UserProfile } from "../types/userTypes";
import { db } from "../config/db";
import { organizeData } from "../utils/dataHandler";
import { HttpStatusCode } from "../types/globalTypes";
import { logger } from "../config/logger";

const createUserProfile = async (c: Context) => {
console.log(await c.req.json())
	try {
		const rawBody = await c.req.json();
		logger.info(rawBody);

		const user = organizeData(rawBody);

		if ('error' in user) {
			logger.error("cannot orgnized data! check utility class")
			return c.json({ message: user.error }, HttpStatusCode.BadRequest);
		}
		const existingUser = await db.userProfile.findUnique({ where: { email: user.email } })
		if(existingUser) return c.json({message: `user ${user.email} already exist! Please login`}, HttpStatusCode.BadRequest)
		const result = await db.userProfile.create({ data: user });
		if (!result)
			return c.json(
				{ message: "Unable to create user profile" },
				HttpStatusCode.BadRequest,
			);
		return c.json(
			{ message: "User profile created successfully" },
			HttpStatusCode.Created,
		);
	} catch (error: unknown) {
		return c.json(
			{ message: `Unable to create user profile: ${error}` },
			HttpStatusCode.BadRequest,
		);
	}
};

const getUserProfile = async (c: Context) => {
	try {
		const userId = c.req.param("userId") as string;

		if (!userId || typeof userId !== "string") {
			return c.json({ message: "Invalid user id" }, HttpStatusCode.BadRequest);
		}

		const userProfile = await db.userProfile.findUnique({ where: { userId } });

		if (!userProfile) {
			throw c.json({ message: "User not found" }, HttpStatusCode.NotFound);
		}

		return c.json(
			{ message: "User found successfully", userProfile },
			HttpStatusCode.Ok,
		);
	} catch (error: unknown) {
		return c.json(
			{ message: `Unable to get user profile: ${error}` },
			HttpStatusCode.BadRequest,
		);
	}
};

const updateUserProfile = async (c: Context) => {
	try {
		const username = c.req.param("id") as string;
		const userData = await c.req.parseBody();

		const user = await db.userProfile.findUnique({
			where: { userId: username },
		});
		if (!user)
			return c.json(
				{ message: "User not found! please signin to make your account" },
				HttpStatusCode.NotFound,
			);
		// await db.userProfile.update()
		return c.json(
			{ message: "User profile updated successfully" },
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{ message: `Unable to update user profile: ${error}` },
			HttpStatusCode.BadRequest,
		);
	}
};

export { createUserProfile, getUserProfile, updateUserProfile };
