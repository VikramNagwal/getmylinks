import { totp } from "otplib";
import { logger } from "../config/logger";


const secret = String(Bun.env.OTP_SECRET_KEY);

totp.options = {
	step: 120,
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
		console.log(token, typeof token);
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


export { generateOTP, validateOtpToken };
