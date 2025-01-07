import { authenticator, totp } from "otplib";
import { logger } from "../config/logger";
import { randomUUIDv7 } from "bun";


const secret = authenticator.generateSecret(4);
totp.options = {
	step: 660,
};

async function generateOTP() {
	try {
		const token = totp.generate(secret);
		return token;
	} catch (error) {
		logger.error(`Error in generating OTP: ${error}`);
		throw new Error("Unable to generate OTP");
	}
}

// Validate OTP Token
async function validateOtpToken(token: string) { 
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
