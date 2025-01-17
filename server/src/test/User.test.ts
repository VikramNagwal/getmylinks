import { AuthHandler } from "../utils/auth-utils";
import { describe, it, expect } from "bun:test";

describe("refersh tokens", () => {
	it("it should generate refersh tokens", async () => {
		const token = await AuthHandler.generateRefreshToken(9);
		expect(token.length).toBeGreaterThan(10);
	});
});
