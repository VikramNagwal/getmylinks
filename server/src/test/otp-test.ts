import { generateOTP, validateOtpToken } from "../service/user-validation";
(async () => {
	const otp = await generateOTP();
	console.log(otp);
	const isValid = await validateOtpToken(otp);
	console.log(isValid);
})();
