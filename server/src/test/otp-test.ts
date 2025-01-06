import {
	generateOTP,
	generateUID,
	validateOtpToken,
} from "../service/user-validation";
// (async () => {
// 	const otp = await generateOTP();
// 	console.log(otp);
// 	const isValid = await validateOtpToken(otp);
// 	console.log(isValid);
// })();

generateUID()
	.then((uid) => console.log(uid))
	.catch((error) => console.error(error));
