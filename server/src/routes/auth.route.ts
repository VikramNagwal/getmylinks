import { Context, Hono } from "hono";
import { loginUser, logoutUser } from "../controller/auth.controller";
import { verifyJWT } from "../middlewares/auth-middleware";
import { HttpStatusCode } from "../types/types";
import {
	generateOTP,
	generateUID,
	validateOtpToken,
} from "../service/otp-service";
import db from "../config/dbConfig";
import { ApiError } from "../utils/error-utils";
import { UserRegisterSchema } from "../schemas/userSchema";
import { isUserEmailExist } from "../service/user-service";
import { AuthHandler } from "../utils/auth-utils";
import { emailQueue } from "../queues/email.queue";

const authRouter = new Hono();

authRouter.post("/register", async (c: Context) => {
	try {
		const { username, name, email, password, bio } = UserRegisterSchema.parse(
			await c.req.json(),
		);
		const existingUser = await isUserEmailExist(email);
		if (existingUser) {
			return c.json(
				{
					success: false,
					message: "Email already exists, please try to login",
				},
				HttpStatusCode.Conflict,
			);
		}

		const otp = await generateOTP();
		const uid = await generateUID();
		const hashedPassword = await AuthHandler.hashPassword(password);

		const user = await db.user.create({
			data: {
				username: String(username.trim().toLowerCase()),
				name: String(name.trim().toLowerCase()),
				email: String(email.trim().toLowerCase()),
				password: hashedPassword,
				verificationUid: uid,
				bio,
			},
		});
		if (!user) {
			return c.json(
				{
					success: false,
					message: "Unable to register user in database",
				},
				HttpStatusCode.InternalServerError,
			);
		}
		await emailQueue.add("sendEmail", { email, otp, uid });
		const { password: _, verificationUid, ...userData } = user;
		return c.json(
			{
				success: true,
				message: "User registered successfully",
				isEmailSent: true,
				data: userData,
				otp,
			},
			HttpStatusCode.Created,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "failed to register user! Internal server error",
			},
			HttpStatusCode.InternalServerError,
		);
	}
});
authRouter.post("/login", loginUser);
authRouter.post("/:uid/verify", async (c: Context) => {
	try {
		const uid = c.req.param("uid");
		const clientOtp = await c.req.parseBody();
		const token = String(clientOtp.otp);

		if (!clientOtp || !uid) {
			return c.json(
				ApiError.badRequest("Invalid otp token, please try again", {
					clientOtp,
					uid,
				}),
			);
		}

		const isValid = await validateOtpToken(token);
		await db.user.findUnique({ where: { verificationUid: uid } });
		await db.user.update({
			where: { verificationUid: uid },
			data: { isVerified: true, verificationUid: null },
		});

		return c.json(
			{
				success: true,
				message: "otp verified",
				clientOtp,
				isValid: isValid,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			new ApiError("An error occurred while verifying otp", 500, true, error),
			500,
		);
	}
});
authRouter.delete("/logout", verifyJWT, logoutUser); // add feature to logout user with unique entity

export { authRouter };
