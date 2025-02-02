import nodemailer from "nodemailer";
import { logger } from "../utils/logger";
import { render } from "@react-email/components";
import React from "react";
import { VerificationEmail } from "./template/verification-code";


// for development purposes only

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
`<p>Please verify your email address</p>
<br>
<h1>this is your uid</h1>
<h2>${uid}</h2>
<button>
<a href="http://localhost:5173/${uid}/verify">verify code</a>
</button>
<br />
<h1>${otp}</h1>`;

async function sendMailtoUser(email: string, otp: string, uid: string) {
	try {
		const verificationEmailHTML = await render(<VerificationEmail Code={otp} uid={uid}/>);
		logger.info("Sending email to", email);

		const sentMail = await transporter.sendMail({
			from: `"OTP Verification" <${Bun.env.SMTP_EMAIL}>`,
			to: email,
			subject: "Email Verification",
			text: "Please verify your email address",
			html: verificationEmailHTML,
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
