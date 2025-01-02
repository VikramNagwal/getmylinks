import { authenticator } from "otplib";
import { logger } from "../config/logger";
import { Resend } from "resend";
import { EmailTemplate } from "../emails/email-template";
import React from "react";

// type EmailTemplateProps = {
// 	otp: string;
// }

const secret = String(Bun.env.OTP_SECRET_KEY);
const resend = new Resend(String(Bun.env.RESEND_API_KEY));

async function generateOTP() {
	try {
		const token = authenticator.generate(secret);
		return token;
	} catch (error) {
		logger.error(`Error in generating OTP: ${error}`);
		throw new Error("Unable to generate OTP");
	}
}

// Validate OTP Token
async function validateOtpToken(token: string) {
	try {
		const isValid = authenticator.verify({ token, secret });
		if (!isValid) throw new Error("Invalid OTP");
		return isValid
	} catch (error) {
		logger.error(`Error in validating OTP: ${error}`);
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("Unable to validate OTP");
	}
}

// Sending Email to User
async function sendEmailtoUser(
	email: string,
	subject: string = "Oxer Email validation",
	otp: string,
) {
	try {
		console.log(email, subject, otp);
		const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: String(subject),
			// react: React.createElement(EmailTemplate, { otp }),
			text: `your otp is ${otp}`,
		});

		if (error) {
			logger.error(`Unable to send email: ${error}`);
			throw new Error("Got error while sending email, resend later");
		}
		return data;
	} catch (error) {
		logger.error(`Error in sending email: ${error}`);
		throw new Error("Unable to send email");
	}
}

export { generateOTP, validateOtpToken, sendEmailtoUser };
