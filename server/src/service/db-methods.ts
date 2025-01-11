import db from "../config/db";
import { logger } from "../config/logger";

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

export { isUserIdExist, isUserEmailExist, getRecordById, deleteUserById };
