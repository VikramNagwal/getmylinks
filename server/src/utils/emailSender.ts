import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: Bun.env.SMTP_HOST,
	port: Number(Bun.env.SMTP_PORT),
	secure: Number(Bun.env.SMTP_PORT) === 465, // true for port 465, false for other ports
	auth: {
		user: Bun.env.SMTP_USER,
		pass: Bun.env.SMTP_PASS,
	},
});

const otpTemplate = (otp: string) =>
	`<b>Please verify your email address</b><br><br><h1>${otp}</h1>`;

async function sendMailtoUser(email: string, otp: string) {
	try {
		const sentMail = await transporter.sendMail({
			from: `"OTP Verification" <${Bun.env.SMTP_USER}>`,
			to: String(email),
			subject: "Email Verification",
			text: "Please verify your email address",
			html: otpTemplate(otp),
		});

		return sentMail;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Unable to send email. Email sending utility malfunctioned! please check the logs",
		);
	}
}

export { sendMailtoUser };
