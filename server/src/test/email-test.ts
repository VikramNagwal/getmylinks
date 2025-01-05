import { generateOTP } from "../service/user-validation";
import { sendMailtoUser } from "../utils/emailSender";


async function sendMail(email: string) {
	const otp = await generateOTP()
	console.log(otp)
	const mailInfo = await sendMailtoUser(email, otp)
	console.log(mailInfo)
}

sendMail('vikramnagwal@gmail.com')