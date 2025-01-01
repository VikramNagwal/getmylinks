import type { Context } from "hono";
import { db } from "../config/db";
import { organizeData } from "../utils/dataHandler";
import { HttpStatusCode } from "../types/types";
import { logger } from "../config/logger";

const createUserProfile = async (c: Context) => {
	try {
		console.log("initiated")
		const rawBody = await c.get("user")
		logger.info(rawBody);

		const user = organizeData(rawBody);

		if (!user || "error" in user) {
			logger.error("Cannot organize data! Check utility class");
			return c.json({ message: user.error }, HttpStatusCode.BadRequest);
		}

		const existingUser = await db.userProfileTable.findUnique({
			where: { email: user.email },
		});

		if (existingUser) {
			return c.json(
				{ message: "user already exists!! Please login" },
				HttpStatusCode.Conflict,
			);
		}

		const result = await db.userProfileTable.create({ data: user });
		if (!result) throw new Error("Unable to create user profile");

		return c.json(
			{
				message: "User profile created successfully",
			},
			HttpStatusCode.Created,
		);
	} catch (error: unknown) {
		logger.error(`User profile creation error: ${error}`);
		return c.json(
			{ message: "Unable to create user profile" },
			HttpStatusCode.BadRequest,
		);
	}
};

const getUserProfile = async (c: Context) => {
	try {
		const userId = c.req.param("userId");

		if (!userId || typeof userId !== "string") {
			return c.json({ message: "Invalid user id" }, HttpStatusCode.BadRequest);
		}

		const userProfile = await db.userProfileTable.findUnique({
			where: { userId },
		});

		if (!userProfile) {
			return c.json({ message: "User not found" }, HttpStatusCode.NotFound);
		}

		return c.json(
			{ message: "User found successfully", userProfile },
			HttpStatusCode.Ok,
		);
	} catch (error: unknown) {
		return c.json(
			{ message: "Unable to get user profile" },
			HttpStatusCode.BadRequest,
		);
	}
};

const updateUserProfile = async (c: Context) => {
	try {
		const userId = c.req.param("id");
		const userData = await c.req.parseBody();

		const user = await db.userProfileTable.findUnique({
			where: { userId },
		});

		if (!user) {
			return c.json(
				{ message: "User not found! please signin to make your account" },
				HttpStatusCode.NotFound,
			);
		}

		// Uncomment and implement update logic
		// const updatedUser = await db.userProfile.update({
		//     where: { userId },
		//     data: userData
		// });

		return c.json(
			{ message: "User profile updated successfully" },
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{ message: "Unable to update user profile" },
			HttpStatusCode.BadRequest,
		);
	}
};

export { createUserProfile, getUserProfile, updateUserProfile };
