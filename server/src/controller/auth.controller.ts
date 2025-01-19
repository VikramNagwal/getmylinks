import type { Context } from "hono";
import db from "../config/dbConfig";
import { AuthHandler } from "../utils/auth-utils";
import { HttpStatusCode } from "../types/types";
import { setCookie, deleteCookie } from "hono/cookie";
import { generateOTP, generateUID } from "../service/otp-service";
import { emailQueue } from "../queues/email.queue";
import { UserLoginSchema, UserRegisterSchema } from "../schemas/userSchema";

const registerUser = async (c: Context) => {
	try {
		const body = UserRegisterSchema.parse(await c.req.json());
		const { username, name, email, password, bio } = body;

		const existingUser = await db.user.findFirst({ where: { email } });
		if (existingUser) {
			return c.json(
				{
					success: false,
					isOperational: true,
					message: "User already exists! Please try to login",
					existingUser,
				},
				HttpStatusCode.Conflict,
			);
		}

		const otp = await generateOTP();
		const uid = await generateUID();
		const hashedPassword = await AuthHandler.hashPassword(password);

		const createdUser = await db.user.create({
			data: {
				username: String(username.trim().toLowerCase()),
				name: String(name.trim().toLowerCase()),
				email: String(email.trim().toLowerCase()),
				password: hashedPassword,
				bio,
				verificationUid: uid,
			},
		});
		if (!createdUser) {
			return c.json(
				{
					success: false,
					isOperational: true,
					message: "Unable to register user in database",
				},
				HttpStatusCode.InternalServerError,
			);
		}

		await emailQueue.add("sendEmail", { email, otp, uid });
		const { password: _, verificationUid, ...userData } = createdUser;

		return c.json(
			{
				success: true,
				message: "User registered successfully",
				isEmailSent: true,
				data: userData,
				otp,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "Unable to register User, Internal server error",
				errorMessage: (error as any)?.message,
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
};

const loginUser = async (c: Context) => {
	try {
		const body = await c.req.json();
		const { email, password } = UserLoginSchema.parse(body);

		// Match user credentials
		const User = await db.user.findUnique({ where: { email: email } });
		if (!User) {
			return c.json(
				{
					success: false,
					isOperational: true,
					message: "Invalid Credentials, User not found!!",
				},
				HttpStatusCode.NotFound,
			);
		}

		// compare password
		const isPasswordMatch = await AuthHandler.comparePassword(
			password,
			User.password,
		);
		if (!isPasswordMatch) {
			return c.json(
				{ message: "Incorrect password, Please check your Credentials" },
				HttpStatusCode.Unauthenticated,
			);
		}

		// generate access and refresh tokens
		const { accessTokens, refreshTokens } =
			await AuthHandler.generateRefreshandAccessToken(User.id);

		const tokens = await AuthHandler.generateAccessToken(User);
		const { password: _, refreshToken, ...userData } = User;

		// setting cookies
		setCookie(c, "accessTokens", tokens, {
			httpOnly: true,
			secure: Bun.env.NODE_ENV === "production",
			sameSite: "Lax",
			maxAge: 60 * 60 * 12,
		});

		setCookie(c, "refreshTokens", refreshTokens, {
			httpOnly: true,
			secure: Bun.env.NODE_ENV === "production",
			sameSite: "Lax",
			maxAge: 7 * 24 * 60 * 60,
		});

		return c.json(
			{
				success: true,
				message: "User logged in successfully",
				data: userData,
			},
			HttpStatusCode.Created,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "Unable to login User, Internal server error",
				errorMessage: (error as any)?.message,
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
};

const logoutUser = async (c: Context) => {
	try {
		const userId = c.get("user")?.payload.id;

		deleteCookie(c, "accessTokens");
		deleteCookie(c, "refreshTokens");
		await db.user.update({
			where: { id: userId },
			data: { refreshToken: null },
		});
		return c.json(
			{
				success: true,
				message: "User logged out successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "Unable to logout User, Internal server error",
				errorMessage: (error as any)?.message,
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
};

export { registerUser, loginUser, logoutUser };
