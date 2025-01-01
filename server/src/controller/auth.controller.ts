import type { Context } from "hono";
import { db } from "../config/db";
import { AuthHandler } from "../utils/authHandler";
import { HttpStatusCode } from "../types/types";
import { setCookie } from "hono/cookie";
import { logger } from "../config/logger";

export type OrganizationType = "INDIVIDUAL" | "BUISNESS";

interface RequestData {
	name: string;
	email: string;
	password: string;
	organization?: OrganizationType;
}

const registerUser = async (c: Context) => {
	try {
		const body = (await c.req.parseBody()) as unknown as RequestData;
		const { name, email, password, organization } = body;

		// check if user already exists
		const User = await db.userTable.findFirst({ where: { email } });
		if (User) {
			return c.json({ message: "User already exists" }, 400);
		}

		const hashedPassword = await AuthHandler.hashPassword(password);
		// create user
		const registerdUser = await db.userTable.create({
			data: {
				name: String(name.trim().toLowerCase()),
				email: String(email.trim().toLowerCase()),
				password: hashedPassword,
				organization: organization || "INDIVIDUAL",
			},
		});
		if (!registerdUser) {
			return c.json(
				{ message: "Unable to register user in database" },
				HttpStatusCode.InternalServerError,
			);
		}

		// remove password and refresh token from response
		const { password: _, refreshToken, ...userData } = registerdUser;

		// return response
		return c.json(
			{
				success: true,
				message: "User registered successfully",
				data: userData,
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
		logger.info("middlware data: login", c.get('jwtPayload'))
		const body = (await c.req.parseBody()) as unknown as RequestData;
		const { email, password } = body;

		// check if user exists
		const User = await db.userTable.findUnique({ where: { email: email } });
		if (!User) {
			return c.json(
				{ message: "Invalid Credentials, User not found!!" },
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
				{ message: "Invalid credentials, Please check your Credentials" },
				HttpStatusCode.Unauthenticated,
			);
		}
		// generate access and refresh tokens
		const { accessTokens, refreshTokens } =
			await AuthHandler.generateRefreshandAccessToken(User.id);

		const { password: _, refreshToken, ...userData } = User;

		// setting cookies
		setCookie(c, "accessTokens", accessTokens, {
			httpOnly: true,
			secure: true,
			sameSite: "Lax",
			maxAge: 15 * 60,
		});

		setCookie(c, "refreshTokens", refreshTokens, {
			httpOnly: true,
			secure: true,
			sameSite: "Lax",
			maxAge: 7 * 24 * 60 * 60,
		});
		// return response
		return c.json({
			success: true,
			message: "User logged in successfully",
			data: userData,
			accessTokens, //remove them in production
			refreshTokens, //remove them in production
		});
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
	logger.info("Logging out user");
	try {
		const body = await c.get('jwtPayload');
		console.log(body)
		const { userId } = body;
		// remove refresh token from database
		const deleteTokens = await db.userTable.update({
			where: { id: userId },
			data: { refreshToken: null },
		})
	} catch (error) {
		return c.json({
			success: false,
			isOperational: true,
			message: "Unable to logout User, Internal server error",
			errorMessage: (error as any)?.message,
			error,
		}, HttpStatusCode.InternalServerError)
	}
};

export { registerUser, loginUser, logoutUser };
