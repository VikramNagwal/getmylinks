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
import {
	EmailBody,
	UsernameBody,
	UserUpdateSchema,
} from "../schemas/userSchema";
import { verifyJWT } from "../middlewares/auth-middleware";
import { getUserDetails } from "../service/link-service";
import { getCookie } from "hono/cookie";
import db from "../config/db-config";
import { AuthHandler } from "../utils/auth-utils";

const userRouter = new Hono();

userRouter.use("*", verifyJWT);

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
userRouter.put("/email/update", async (c: Context) => {
	try {
		const userId = await c.get("user").payload.id;
		console.log(c.get("user"));
		console.log(userId);
		const body = await c.req.parseBody();
		const { email } = EmailBody.parse(body);

		const updateEmail = await updateUserEmail(userId, email);
		if (!updateEmail) {
			return c.json({
				success: false,
				message: "An error occurred while updating user email",
			});
		}
		return c.json(
			{
				success: updateEmail,
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
userRouter.put("/username/update", async (c: Context) => {
	try {
		const userId = await c.get("user").payload.id;
		const { username } = UsernameBody.parse(await c.req.parseBody());

		const existUser = await checkUserByUsername(username);
		if (existUser) {
			return c.json({
				success: false,
				message: "Username already exists",
			});
		}
		const updatedUser = await updateUsername(userId, username);
		if (!updatedUser) {
			return c.json({
				success: false,
				message: "An error occurred while updating username",
			});
		}

		return c.json(
			{
				success: true,
				message: "username updated successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "Unable to update username! Please try again later",
			},
			HttpStatusCode.InternalServerError,
		);
	}
});
userRouter.put("/update", async (c: Context) => {
	try {
		const body = UserUpdateSchema.parse(await c.req.parseBody());
		const userId = await getIdFromMiddleware(c);

		const updatedUser = await updateUserProfile(userId, body);
		return c.json({
			success: true,
			message: "user profile updated successfully",
			updatedUser,
		});
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "An error occurred while updating user profile",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});
userRouter.delete("/delete", async (c: Context) => {
	try {
		const user = await c.get("user");
		const userId = user.payload.id;

		await deleteUserById(userId);

		return c.json({
			success: true,
			message: "user deleted successfully",
		});
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
userRouter.get("/refresh-tokens", async (c: Context) => {
	try {
		const refershToken = getCookie(c, "refershTokens");
		if (!refershToken) {
			return c.json(
				{
					success: false,
					message: "cookies not found",
				},
				HttpStatusCode.NotFound,
			);
		}

		const userExists = await db.user.findFirst({
			where: { refreshToken: refershToken },
		});
		const newTokens = await AuthHandler.generateAccessToken(userExists);
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
