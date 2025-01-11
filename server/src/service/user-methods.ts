import { Context } from "hono";
import db from "../config/db";
import { logger } from "../config/logger";
import { emailQueue } from "../queues/email.queue";
import { generateOTP, generateUID } from "./user-validation";

async function isUserIdExist(id: number): Promise<boolean> {
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

async function getRecordById(id: number): Promise<any> {
	try {
		const record = await db.user.findUnique({ where: { id } });
		return record;
	} catch (error) {
		logger.error(`Error in getting record by id: ${error}`);
		throw new Error("Unable to get record by id! db operation failed");
	}
}

async function deleteUserById(id: number): Promise<void> {
	try {
		const deletedUser = await db.user.delete({ where: { id } });
	} catch (error) {
		logger.error(`Error in deleting user by id: ${error}`);
		throw new Error("Unable to delete user by id! db operation");
	}
}

async function updateUserProfile(userId: number, body: any): Promise<any> {
	try {
		const updatedUser = await db.user.update({
			where: { id: userId },
			data: body,
		});
		const { password, refreshToken, verificationUid, id, ...profile } =
			updatedUser;
		return profile;
	} catch (error) {
		logger.error(`Error in updating user profile: ${error}`);
		throw new Error("Unable to update user profile! db operation failed");
	}
}

async function updateUserEmail(userId: number, email: string): Promise<any> {
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

async function getIdFromMiddleware(c: Context): Promise<number> {
	try {
		const user = await c.get("user");
		const userId = user.payload.id;
		return userId;
	} catch (error) {
		logger.error(`Error in getting user id from middleware: ${error}`);
		throw new Error("Unable to get user id from middleware");
	}
}

export {
	isUserIdExist,
	isUserEmailExist,
	getRecordById,
	deleteUserById,
	updateUserProfile,
	updateUserEmail,
	getIdFromMiddleware,
};
