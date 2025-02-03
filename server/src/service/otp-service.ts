import { authenticator, totp } from "otplib";
import { randomUUIDv7 } from "bun";
import { logger } from "../utils/logger";

totp.options = {
	step: 1800,
	window: 3,
};

async function generateOTP() {
	const secret = authenticator.generateSecret(20);
	try {
		const otp = totp.generate(secret);
		return { otp, secret };
	} catch (error) {
		logger.error(`Error in generating OTP: ${error}`);
		throw new Error("Unable to generate OTP");
	}
}

// Validate OTP Token
async function validateOtpToken(token: string, secret: string) {
	try {
		const isValid = totp.verify({ token, secret });
		if (!isValid) throw new Error("Invalid OTP");
		return isValid;
	} catch (error) {
		logger.error(`Error in validating OTP: ${error}`);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Unable to validate OTP");
	}
}

async function generateUID() {
	try {
		const uid = randomUUIDv7("hex");
		return uid;
	} catch (error) {
		throw new Error("Unable to generate UID");
	}
}
export { generateOTP, validateOtpToken, generateUID };
