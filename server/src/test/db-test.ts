import db from "../config/db";
import { logger } from "../config/logger";
import { isUserEmailExist } from "../service/db-methods";

const key = String(Bun.env.DATABASE_URL);
logger.info(key);
console.log(key);

async function createUser() {
	const user = await db.user.create({
		data: {
			name: "John Doe",
			email: "johndoe@itself.me",
			password: "password",
			username: "johndoex",
		},
	});
	console.log(user);
	return user;
}
createUser();

async function getUser(email: string) {
	const doesExist = await isUserEmailExist(email);
	console.log(doesExist);
	return doesExist;
}

getUser("johndoe@itsef.me");
