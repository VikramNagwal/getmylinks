import { Context, Hono } from "hono";
import {
	deleteUserById,
	getIdFromMiddleware,
	updateUserEmail,
	updateUserProfile,
} from "../service/user-methods";
import { HttpStatusCode } from "../types/types";
import { EmailBody, UserUpdateSchema } from "../schemas/userSchema";

const userRouter = new Hono();

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
		const userId = await getIdFromMiddleware(c);
		const { email } = EmailBody.parse(await c.req.parseBody());
		const updateEmail = await updateUserEmail(userId, email);
		if (!updateEmail) {
			return c.json({
				success: false,
				message: "An error occurred while updating user email",
			});
		}
		return c.json(
			{
				success: updateEmail === "true",
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

export { userRouter };
