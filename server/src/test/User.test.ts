import { AuthHandler } from "../utils/auth-utils";
import { describe, it, expect } from "bun:test";

describe("refersh tokens", () => {
	it("it should generate refersh tokens", async () => {
		const token = await AuthHandler.generateRefreshToken(9);
		expect(token.length).toBeGreaterThan(10);
	});
});

describe("validate token", () => {
	it("it should validate token", async () => {
		const token = await AuthHandler.generateRefreshToken(9);
		const isValid = await AuthHandler.verifyRefershTokens(token);
		expect(isValid).toBeObject();
	});
});
