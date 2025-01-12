import { generateOTP, validateOtpToken } from "../service/otp-service";

let val = 4;

(async () => {
	const otp = await generateOTP();
	console.log(otp);
	setTimeout(async () => {
		const isValid = await validateOtpToken(otp);
		console.log(isValid);
	}, 2000);
})();

// generateUID()
// 	.then((uid) => console.log(uid))
// 	.catch((error) => console.error(error));
