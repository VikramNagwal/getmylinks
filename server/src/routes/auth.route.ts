import db from "../config/dbConfig";
import { z } from "zod";
import { Context, Hono } from "hono";
import { HttpStatusCode } from "../types/types";
import { AuthHandler } from "../utils/tokens";
import { emailQueue } from "../queues/email.queue";
import { deleteCookie, setCookie } from "hono/cookie";
import { authenticateJWT } from "../middlewares/auth-middleware";
import {
	generateOTP,
	generateUID,
	validateOtpToken,
} from "../service/otp-service";
import { UserLoginSchema, UserRegisterSchema } from "../schemas/userSchema";
import {
	getIdFromMiddleware,
	isUserEmailExist,
	setAllCookies,
} from "../service/user-service";

const authRouter = new Hono();

const otpSchema = z.object({
	otp: z.string().max(6).min(6),
});

authRouter.post("/register", async (c: Context) => {
	try {
		const { username, name, email, password } = UserRegisterSchema.parse(
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
				passwordHash: hashedPassword,
				verificationUid: uid,
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
		const { passwordHash: _, verificationUid, ...userData } = user;
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
				passwordHash: true,
			},
		});
		if (!user) {
			return c.json(
				{
					success: false,
					message: "Invalid Credentials, User not found!!",
				},
				HttpStatusCode.NotFound,
			);
		}
		const isPasswordMatch = await AuthHandler.comparePassword(
			password,
			user.passwordHash,
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
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
		});
		setCookie(c, "refreshTokens", refreshTokens, {
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
		});

		const { passwordHash: _, ...userData } = user;

		return c.json(
			{
				success: true,
				message: "User logged in successfully",
				data: userData,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return c.json(
				{
					success: false,
					message: "Invalid data",
					errors: error.errors,
				},
				HttpStatusCode.BadRequest,
			);
		}
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
		const { otp } = otpSchema.parse(await c.req.parseBody());
		const token = String(otp);

		if (!token || !uid) {
			return c.json(
				{
					success: false,
					message: "Invalid OTP token",
				},
				HttpStatusCode.BadRequest,
			);
		}

		const isValid = await validateOtpToken(token);
		console.log(isValid);
		if (!isValid) {
			return c.json(
				{
					success: false,
					message: "Invalid OTP token",
				},
				HttpStatusCode.BadRequest,
			);
		}

		const authenticUser = await db.user.update({
			where: { verificationUid: uid },
			data: { emailVerified: true, verificationUid: null },
		});

		if (!authenticUser) {
			return c.json(
				{
					success: false,
					message: "Invalid user",
				},
				HttpStatusCode.NotFound,
			);
		}

		const { accessTokens, refreshTokens } =
			await AuthHandler.generateRefreshandAccessToken(authenticUser.id);
		await setAllCookies(c, accessTokens, refreshTokens);

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

authRouter.get("/logout", authenticateJWT, async (c: Context) => {
	try {
		const userId = await getIdFromMiddleware(c);
		if (!userId) {
			return c.json(
				{
					success: false,
					message: "Unauthorized request! please login to continue",
				},
				HttpStatusCode.Unauthenticated,
			);
		}

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
				message: "failed to logout user! Internal database error",
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

authRouter.get("/get-user", authenticateJWT, async (c: Context) => {
	try {
		const user = await c.get("user");
		if (Object.keys(user).length === 0) throw new Error("Unauthorized user");
		return c.json({ user }, HttpStatusCode.Ok);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "Unauthorized user",
			},
			HttpStatusCode.Unauthenticated,
		);
	}
});

authRouter.post("/:email/resend-otp", async (c: Context) => {
	try {
		const email = c.req.param("email");
		const existingUser = await isUserEmailExist(email);
		if (!existingUser) {
			return c.json(
				{
					success: false,
					message: "Email not found",
				},
				HttpStatusCode.NotFound,
			);
		}
		if (existingUser.emailVerified) {
			return c.json(
				{
					success: false,
					message: "Email already verified",
				},
				HttpStatusCode.BadRequest,
			);
		}
		const otp = await generateOTP();
		const uid = await generateUID();

		await db.user.update({
			where: { email },
			data: { verificationUid: uid },
		});
		await emailQueue.add("ResendEmail", { email, otp, uid });
		return c.json(
			{
				success: true,
				message: "OTP sent successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "failed to resend otp",
			},
			HttpStatusCode.BadRequest,
		);
	}
});

export { authRouter };
