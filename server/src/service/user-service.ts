import { Context } from "hono";
import db from "../config/dbConfig";
import { emailQueue } from "../queues/email.queue";
import { generateOTP, generateUID } from "./otp-service";
import redis from "../lib/redis";
import { setCookie } from "hono/cookie";
import { logger } from "../utils/logger";

// config
const USERNAME_PREFIX = "username";
const CACHE_TTL = 60 * 60 * 4;

async function isUserIdExist(id: string): Promise<boolean> {
	try {
		const doesExist = await db.user.findUnique({ where: { id } });
		return doesExist ? true : false;
	} catch (error) {
		logger.error(`Error in checking user existence: ${error}`);
		throw new Error("Unable to check user existence! db operation failed");
	}
}

async function isUserEmailExist(email: string): Promise<boolean> {
	try {
		const doesExist = await db.user.findFirst({ where: { email } });
		return doesExist ? true : false;
	} catch (error) {
		logger.error(`Error in checking user existence: ${error}`);
		throw new Error("Unable to check user existence! db operation failed");
	}
}

async function getRecordById(id: string): Promise<any> {
	try {
		const record = await db.user.findUnique({ where: { id } });
		return record;
	} catch (error) {
		logger.error(`Error in getting record by id: ${error}`);
		throw new Error("Unable to get record by id! db operation failed");
	}
}

async function deleteUserById(id: string): Promise<void> {
	try {
		const deletedUser = await db.user.delete({ where: { id } });
	} catch (error) {
		logger.error(`Error in deleting user by id: ${error}`);
		throw new Error("Unable to delete user by id! db operation");
	}
}

async function updateUserProfile(userId: string, body: any): Promise<any> {
	try {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: body,
		});
		const { passwordHash, refreshToken, verificationUid, id, ...profile } =
			updatedUser;
		return profile;
	} catch (error) {
		logger.error(`Error in updating user profile: ${error}`);
		throw new Error("Unable to update user profile! db operation failed");
	}
}

async function updateUserEmail(
	userId: string,
	email: string,
): Promise<boolean> {
	try {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: { email },
		});
		if (!updatedUser) {
			throw new Error("Unable to update user email! db operation failed");
		}
		const otp = await generateOTP();
		const uid = await generateUID();

		await db.user.update({
			where: { id: userId },
			data: { verificationUid: uid },
		});
		await emailQueue.add("email-update", { email, otp, uid });

		return true;
	} catch (error) {
		logger.error(`Error in updating user email: ${error}`);
		throw new Error("Unable to update user email! db operation failed");
	}
}

async function updateUsername(
	userId: string,
	username: string,
): Promise<boolean> {
	try {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: { username },
		});
		if (!updatedUser) {
			throw new Error("Unable to update user username! db operation failed");
		}
		return true;
	} catch (error) {
		logger.error(`Error in updating user username: ${error}`);
		throw new Error("Unable to update user username! db operation failed");
	}
}

async function getIdFromMiddleware(c: Context): Promise<string> {
	try {
		const userId = await c.get("user").payload.userId;

		return userId;
	} catch (error) {
		logger.error(`Error in getting user id from middleware: ${error}`);
		throw new Error("Unable to get user id from middleware");
	}
}

async function checkUserByUsername(username: string): Promise<boolean> {
	const key = `${USERNAME_PREFIX}:${username}`;
	try {
		const usernameCache = await redis.get(key);
		if (usernameCache === "1") {
			return true;
		}
		const doesExist = await db.user.findFirst({
			where: { username },
			select: { id: true },
		});
		if (!doesExist) {
			return false;
		}
		await redis.set(key, "1", "EX", CACHE_TTL);
		return true;
	} catch (error) {
		logger.error(`Error in checking user existence: ${error}`);
		throw new Error(
			`Unable to check user existence! db operation failed: ${error}`,
		);
	}
}

async function setAllCookies(
	accessToken: string,
	refreshToken: string,
	c: Context,
) {
	setCookie(c, "accessTokens", accessToken);
	setCookie(c, "refreshTokens", refreshToken);
}

export {
	isUserIdExist,
	isUserEmailExist,
	getRecordById,
	deleteUserById,
	updateUserProfile,
	updateUserEmail,
	getIdFromMiddleware,
	updateUsername,
	checkUserByUsername,
	setAllCookies,
};
