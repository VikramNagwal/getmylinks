import db from "../config/db-config";
import { logger } from "../config/logger-config";
import { isUserEmailExist } from "../service/user-service";

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
