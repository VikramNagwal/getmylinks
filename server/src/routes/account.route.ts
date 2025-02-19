import db from "@lib/db";
import { AuthHandler } from "@/utils/tokens";
import { logger } from "@/utils/logger";
import { Context, Hono } from "hono";
import { getIdFromMiddleware } from "@/services/user-service";
import { HttpStatusCode, userId } from "@/types/global";
import { authenticateJWT } from "@/middlewares/auth-middleware";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

const userRouter = new Hono();

/* middleware to authenticate user */
userRouter.use("*", authenticateJWT);

userRouter.post("/create", async (c: Context) => {
	try {
		const user = await c.get("user");
		const userId = user.payload.id ?? null;
		const { bio, avatar } = await c.req.json();

		const account = await db.account.create({
			data: {
				bio,
				avatar,
				user: {
					connect: { id: userId },
				},
			},
		});
		if (!account)
			throw new Error("database error! unable to craete user account");
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

userRouter.put("/bio/update", async (c: Context) => {
	try {
		const userId = await getIdFromMiddleware(c);
		const { bio } = await c.req.json();

		await db.account.update({
			where: { userId },
			data: { bio },
		});

		return c.json(
			{
				success: true,
				message: "Bio updated successfully",
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "An error occurred while updating account info",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

userRouter.delete("/delete", async (c: Context) => {
	try {
		const userId = await getIdFromMiddleware(c);

		await db.account.delete({
			where: { userId },
		});

		const deleted = deleteCookie(c, "accessToken", {
			path: "/",
			domain: "localhost",
		});
		deleteCookie(c, "refreshToken", {
			path: "/",
			domain: "localhost",
		});

		return c.json(
			{
				success: true,
				message: "user deleted successfully",
				deleted,
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
			throw new Error("no token found");
		}

		const user = await db.user.findFirst({
			where: { refreshToken },
			select: {
				id: true,
				email: true,
			},
		});
		if (!user) {
			throw new Error("internal database error! unable to update user tokens");
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
				message: "An error occurred while updating tokens",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

userRouter.get("/:username/profile", async (c: Context) => {
	try {
		const username = c.req.param("username");
		const user = await db.user.findFirst({
			where: { username },
			select: {
				id: true,
				username: true,
				email: true,
				createdAt: true,
				updatedAt: true,
				Account: {
					select: {
						bio: true,
						avatar: true,
					},
				},
			},
		});
		if (!user) {
			return c.json(
				{
					success: false,
					message: "user not found",
				},
				HttpStatusCode.NotFound,
			);
		}
		return c.json(
			{
				success: true,
				message: "user profile fetched successfully",
				user,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				message: "An error occurred while fetching user profile",
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

export { userRouter };
