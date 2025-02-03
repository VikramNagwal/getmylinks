import { generateOTP, validateOtpToken } from "../service/otp-service";
import { describe, it, expect } from "bun:test";
import { logger } from "../utils/logger";


describe("generate otp", () => {
	it("it should generate otp", async () => {
		const {otp, secret} = await generateOTP();
		logger.info(`OTP: ${otp}`);
		logger.info(`Secret: ${secret}`);
		expect(otp.length).toBeGreaterThan(3);
	});
});

describe("validate otp", () => {
	it("it should validate otp", async () => {
		const otp = '481924';
		const secret = "HEPBKABGDUYHMVBPEB2FIQZDAJDQQS2K"

		const isValid = await validateOtpToken(otp, secret);
		expect(isValid).toBe(true);
	});
});
