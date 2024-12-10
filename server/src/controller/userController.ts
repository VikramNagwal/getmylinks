import type { Context } from "hono";
import type { UserProfile } from "../types/userTypes";
import { db } from "../config/db";

const createUserProfile = async (c: Context) => {
	const {
		userId,
		name,
		email,
		password,
		bio,
		avatarUrl,
		coverUrl,
		interests,
	}: UserProfile = await c.req.json();

	const essentials = [userId, name, email, interests];

	if (essentials.every((field) => field)) {
		return c.json({ message: "Please provide all the required fields" }, 400);
	}
	const userProfile = await db.userProfile.create({
		data: {
			userId,
			name,
			email,
			bio,
			avatarUrl,
			coverUrl,
			interests,
		},
	});

	if (userProfile) {
		return c.json(
			{ message: "user profile created successfully", user: userProfile },
			201,
		);
	}
};

export { createUserProfile };
