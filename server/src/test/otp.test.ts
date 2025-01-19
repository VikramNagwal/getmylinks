import { generateOTP, validateOtpToken } from "../service/otp-service";
import { describe, it, expect } from "bun:test";

describe("generate otp", () => {
	it("it should generate otp", async () => {
		const otp = await generateOTP()
		console.log(otp)
		expect(otp.length).toBeGreaterThan(3);
	})
})

describe("validate otp", () => {
	it("it should validate otp", async () => {
		const otp = await generateOTP()
		const isValid = await validateOtpToken(otp)
		expect(isValid).toBe(true);
	})
})