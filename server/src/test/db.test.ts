import db from "../config/dbConfig";
import { describe, it, expect } from "bun:test";

const key = String(Bun.env.DATABASE_URL);

async function createUser() {
	const user = await db.user.create({
		data: {
			username: "johndoex",
			name: "John Doe",
			email: "johndoe@itself.me",
			passwordHash: "password",
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
