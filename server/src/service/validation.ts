import { authenticator } from "otplib";
import { logger } from "../config/logger";

const secret = String(Bun.env.OTP_SECRET_KEY);

async function generateOTP() {
	try {
		const token = authenticator.generate(secret);
		return token;
	} catch (error) {
		logger.error(`Error in generating OTP: ${error}`);
		throw new Error("Unable to generate OTP");
	}
}

async function validateOtpToken(token: string) {
	try {
		const isValid = authenticator.verify({ token, secret });
	} catch (error) {
		logger.error(`Error in validating OTP: ${error}`);
		throw new Error("Unable to validate OTP");
	}
}
