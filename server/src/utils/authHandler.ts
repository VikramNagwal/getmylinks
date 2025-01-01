import { decode, sign, verify } from "hono/jwt";
import { OrganizationType } from "../controller/auth.controller";
import { db } from "../config/db";
import { HttpStatusCode } from "../types/types";

type TokenPaylod = {
	userId: number;
	name: string;
	email: string;
	organization?: OrganizationType;
};

class AuthHandler {
	static async hashPassword(password: string): Promise<string> {
		const hashedPassword = await Bun.password.hash(password, {
			algorithm: "bcrypt",
			cost: 4,
		});
		return hashedPassword;
	}

	static async comparePassword(
		password: string,
		hashedPassword: string,
	): Promise<boolean> {
		const isMatch = await Bun.password.verify(password, hashedPassword);
		return isMatch;
	}

	static async generateAccessToken(payload: TokenPaylod): Promise<string> {
		const accessToken = await sign(
			{ payload, exp: Math.floor(Date.now() / 1000) + 900 }, // 15 minutes
			process.env.ACCESS_TOKEN_SECRET!,
		);
		return accessToken;
	}

	static async generateRefreshToken(userId: number): Promise<string> {
		const refreshToken = await sign(
			{ userId, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 }, // 7 days
			process.env.REFRESH_TOKEN_SECRET!,
		);
		return refreshToken;
	}

	static async generateRefreshandAccessToken(userId: number) {
		try {
			const user = await db.userTable.findUnique({ where: { id: userId } });
			if (!user) throw Error("user not found! Invalid user Id");
			const accessTokens = await this.generateAccessToken({
				userId: user!.id,
				name: user!.name,
				email: user!.email,
				organization: user!.organization as OrganizationType,
			});
			const refreshTokens = await this.generateRefreshToken(user!.id);

			// update refresh token in db
			await db.userTable.update({
				where: { id: user!.id },
				data: { refreshToken: refreshTokens },
			});

			return { accessTokens, refreshTokens };
		} catch (error) {
			throw new Error("Error generating tokens");
		}
	}

	static async verifyTokens(token: string) {
		try {
			return await verify(token, process.env.ACCESS_TOKEN_SECRET!);
		} catch (error) {
			throw new Error("Error verifying tokens");
		}
	}
}

export { AuthHandler };
