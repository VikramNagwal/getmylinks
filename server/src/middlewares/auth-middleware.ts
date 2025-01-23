import { createMiddleware } from "hono/factory";
import { Context, Next } from "hono";
import { verify } from "hono/jwt";
import { HttpStatusCode } from "../types/types";
import db from "../config/dbConfig";
import { AuthHandler } from "../utils/auth-utils";
import { setAllCookies } from "../service/user-service";

interface Tokens {
	accessTokens: string;
	refreshTokens: string;
}

const extractTokens = (cookieHeader?: string): Tokens | null => {
	if (!cookieHeader) return null;

	const tokens = {} as Partial<Tokens>;
	const cookies = cookieHeader.split(";");

	for (const cookie of cookies) {
		const [name, value] = cookie.trim().split("=");
		if (name === "accessTokens" || name === "refreshTokens") {
			tokens[name] = value;
		}
	}

	return tokens.accessTokens || tokens.refreshTokens
		? (tokens as Tokens)
		: null;
};

export const verifyJWT = createMiddleware(async (c: Context, next: Next) => {
	try {
		const tokens = extractTokens(c.req.header("Cookie"));
		if (!tokens) {
			return c.json(
				{ message: "Authentication required" },
				HttpStatusCode.Unauthenticated,
			);
		}

		try {
			const decodedToken = await verify(
				tokens.accessTokens,
				Bun.env.ACCESS_TOKEN_SECRET!,
			);
			c.set("user", decodedToken);
			return await next();
		} catch {
			const decodedRefresh = await verify(
				tokens.refreshTokens,
				Bun.env.REFRESH_TOKEN_SECRET!,
			);

			const user = await db.user.findUnique({
				where: { id: Number(decodedRefresh.userId) },
				select: { id: true, refreshToken: true },
			});

			if (!user || tokens.refreshTokens !== user.refreshToken) {
				return c.json(
					{
						success: false,
						message: "expired tokens or invalid user",
					},
					HttpStatusCode.BadRequest,
				);
			}

			const newTokens = await AuthHandler.generateRefreshandAccessToken(
				user.id,
			);

			const { accessTokens, refreshTokens } = newTokens;
			await setAllCookies(accessTokens, refreshTokens, c);

			await db.$transaction(async (tx) => {
				await tx.user.update({
					where: { id: user.id },
					data: { refreshToken: newTokens.refreshTokens },
				});
			});

			c.set("user", user);
			return await next();
		}
	} catch (error) {
		return c.json(
			{ message: "Authentication failed" },
			HttpStatusCode.InternalServerError,
		);
	}
});
