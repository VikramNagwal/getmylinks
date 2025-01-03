import { Resend } from "resend";
import { generateOTP } from "../service/user-validation";

const secret = Bun.env.RESEND_API_KEY;

const resend = new Resend(secret);

async function sendMail(to: string, subject: string) {
	const otp = await generateOTP();
	console.log("otp: ", otp);

	const { data, error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: [to],
		subject: String(subject),
		// react: React.createElement(EmailTemplate, { otp }),
		text: `your otp is ${otp}`,
	});

	if (error) {
		console.log(error);
		throw new Error("Got error while sending email, resend later");
	}
	// console.log(data)
	return data;
}

sendMail("vikramnagwal@gmail.com", "testing email sending");
