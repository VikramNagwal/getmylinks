import db from "../config/dbConfig";
import { describe, it, expect } from "bun:test";
import { logger } from "../utils/logger";
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
describe("create user", () => {
	it("it should create user", async () => {
		const user = await createUser();
		expect(user).toHaveProperty("id");
		expect(user).toBeObject();
		expect(user).toHaveReturned();
	});
});

// async function getUser(email: string) {
// 	const doesExist = await isUserEmailExist(email);
// 	console.log(doesExist);
// 	return doesExist;
// }

// getUser("johndoe@itsef.me");
