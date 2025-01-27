import db from "../config/dbConfig";
import { AuthHandler } from "../utils/tokens";
import { logger } from "../utils/logger";
import { Context, Hono } from "hono";
import {
	checkUserByUsername,
	deleteUserById,
	getIdFromMiddleware,
	getRecordById,
	updateUserEmail,
	updateUsername,
	updateUserProfile,
} from "../service/user-service";
import { HttpStatusCode } from "../types/types";
import { authenticateJWT } from "../middlewares/auth-middleware";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const userRouter = new Hono();

userRouter.use("*", authenticateJWT);

userRouter.get("/profile", async (c: Context) => {
	try {
		const user = await c.get("user");
		const userData = user.payload;

		const { password, refreshToken, id, verificationUid, ...profile } =
			userData;

		return c.json({
			success: true,
			profile,
		});
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "An error occurred while fetching user profile",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

userRouter.post("/add/profile", async (c: Context) => {
	try {
		const user = await c.get("user");
		const { bio, avatar } = await c.req.json();
		const userId = user.payload.id;

		if (!userId) {
			throw new Error("Invalid user id");
		}

		const profile = await db.profile.create({
			data: {
				bio,
				avatar,
				user: {
					connect: { id: userId },
				},
			},
		});
		if (!profile) throw new Error("Unable to add profile");
		return c.json(
			{
				success: true,
				message: "Profile added successfully",
			},
			HttpStatusCode.Created,
		);
	} catch (error) {
		logger.error(error);
		return c.json(
			{
				success: false,
				message: "An error occurred while adding profile",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

userRouter.put("/profile/update", async (c: Context) => {
	try {
		const userId = await getIdFromMiddleware(c);
		const profileData = await c.req.json();

		const updatedProfile = await db.profile.update({
			where: { userId },
			data: profileData,
		});
		if (!updatedProfile) {
			throw new Error("Unable to update profile");
		}

		return c.json(
			{
				success: true,
				message:
					"user email updated successfully! A verififcation email has been sent to your new email address",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "An error occurred while updating user email",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

userRouter.delete("/account/delete", async (c: Context) => {
	try {
		const user = await c.get("user");
		const userId = user.payload.id;

		await deleteUserById(userId);
		deleteCookie(c, "accessToken");
		deleteCookie(c, "refreshToken");

		return c.json(
			{
				success: true,
				message: "user deleted successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "An error occurred while deleting user! please try again",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

userRouter.post("/refresh-tokens", async (c: Context) => {
	try {
		const refreshToken = getCookie(c, "refershTokens");

		if (!refreshToken) {
			throw new Error("Invalid tokens");
		}

		const user = await db.user.findFirst({
			where: { refreshToken: refreshToken },
			select: {
				id: true,
				email: true,
			},
		});
		if (!user) {
			throw new Error("internal database error");
		}
		const newTokens = await AuthHandler.generateRefreshandAccessToken(user.id);

		setCookie(c, "accessToken", newTokens.accessTokens);
		setCookie(c, "refreshToken", newTokens.refreshTokens);

		return c.json(
			{
				success: true,
				message: "tokens refreshed successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "An error occurred while refreshing tokens",
				error,
			},
			HttpStatusCode.BadRequest,
		);
	}
});

export { userRouter };
