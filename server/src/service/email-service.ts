import nodemailer from "nodemailer";
import { logger } from "../utils/logger";

const transporter = nodemailer.createTransport({
	host: Bun.env.SMTP_HOST,
	port: Number(Bun.env.SMTP_PORT),
	auth: {
		user: Bun.env.SMTP_EMAIL,
		pass: Bun.env.SMTP_PASS,
	},
	// logger: true,
	// debug: true,
});

const otpTemplate = (uid: string, otp: string) =>
	`<b>Please verify your email address</b><br><h1>this is your uid</h1><br>${uid}<br><h1>${otp}</h1>`;

async function sendMailtoUser(email: string, otp: string, uid: string) {
	try {
		logger.info("Sending email to", email);

		const sentMail = await transporter.sendMail({
			from: `"OTP Verification" <${Bun.env.SMTP_EMAIL}>`,
			to: email,
			subject: "Email Verification",
			text: "Please verify your email address",
			html: otpTemplate(uid, otp),
		});

		return sentMail;
	} catch (error) {
		logger.error(error);
		throw new Error(
			"Unable to send email. Email sending utility malfunctioned! please check the logs",
		);
	}
}

export { sendMailtoUser };
