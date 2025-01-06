import {
	generateOTP,
	generateUID,
	validateOtpToken,
} from "../service/user-validation";
(async () => {
	const otp = await generateOTP();
	console.log(otp);
	setTimeout(async () => {
		const isValid = await validateOtpToken(otp);
		console.log(isValid);
	}, 15000);
})();

// generateUID()
// 	.then((uid) => console.log(uid))
// 	.catch((error) => console.error(error));
