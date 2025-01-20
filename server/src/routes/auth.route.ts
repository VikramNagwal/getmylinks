import { z } from "zod";
import db from "../config/dbConfig";
import { Context, Hono } from "hono";
import { verifyJWT } from "../middlewares/auth-middleware";
import { HttpStatusCode } from "../types/types";
import {
	generateOTP,
	generateUID,
	validateOtpToken,
} from "../service/otp-service";
import { UserLoginSchema, UserRegisterSchema } from "../schemas/userSchema";
import { getIdFromMiddleware, isUserEmailExist } from "../service/user-service";
import { AuthHandler } from "../utils/auth-utils";
import { emailQueue } from "../queues/email.queue";
import { deleteCookie, setCookie } from "hono/cookie";

const authRouter = new Hono();

const otpSchema = z.object({
	otp: z.number().max(6).min(6),
});

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
				data: userData,
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
authRouter.post("/login", async (c: Context) => {
	try {
		const { email, password } = UserLoginSchema.parse(await c.req.json());

		const user = await db.user.findUnique({
			where: { email },
			select: {
				id: true,
				username: true,
				password: true,
			},
		});
		if (!user) {
			return c.json(
				{
					success: false,
					isOperational: true,
					message: "Invalid Credentials, User not found!!",
				},
				HttpStatusCode.NotFound,
			);
		}
		const isPasswordMatch = await AuthHandler.comparePassword(
			password,
			user.password,
		);
		if (!isPasswordMatch) {
			return c.json(
				{ message: "Incorrect password, Please check your Credentials" },
				HttpStatusCode.Unauthenticated,
			);
		}

		const { accessTokens, refreshTokens } =
			await AuthHandler.generateRefreshandAccessToken(user.id);

		setCookie(c, "accessTokens", accessTokens, {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 days
		});
		setCookie(c, "refreshTokens", refreshTokens, {
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 days
		});

		const { password: _, ...userData } = user;

		return c.json(
			{
				success: true,
				message: "User logged in successfully",
				data: userData,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "failed to login user! Internal server error",
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

authRouter.post("/:uid/verify", async (c: Context) => {
	try {
		const uid = c.req.param("uid");
		const { otp } = otpSchema.parse(await c.req.json());
		const token = String(otp);

		if (!otp || !uid) {
			return c.json(
				{
					success: false,
					message: "Invalid OTP token",
				},
				HttpStatusCode.BadRequest,
			);
		}

		const isValid = await validateOtpToken(token);
		if (!isValid) {
			throw new Error("Invalid OTP token");
		}
		await db.user.findUnique({ where: { verificationUid: uid } });
		await db.user.update({
			where: { verificationUid: uid },
			data: { isVerified: true, verificationUid: null },
		});

		return c.json(
			{
				success: true,
				message: "user verified successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error: any) {
		return c.json(
			{
				success: false,
				message: error?.message ?? "failed to verify user",
			},
			HttpStatusCode.BadRequest,
		);
	}
});
authRouter.delete("/logout", verifyJWT, async (c: Context) => {
	try {
		const userId = await getIdFromMiddleware(c);
		deleteCookie(c, "accessTokens");
		deleteCookie(c, "refreshTokens");
		await db.user.update({
			where: { id: userId },
			data: { refreshToken: null },
		});
		return c.json(
			{
				success: true,
				message: "Successfully logged out",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "failed to logout user! Internal database error",
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

export { authRouter };
