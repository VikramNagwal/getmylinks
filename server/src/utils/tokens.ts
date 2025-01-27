import { sign, verify } from "hono/jwt";
import db from "../config/dbConfig";

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

	static async generateAccessToken(payload: any): Promise<string> {
		const accessToken = await sign(
			{ payload, exp: Math.floor(Date.now() / 1000) + 3600 * 12 }, // 12 hours
			process.env.ACCESS_TOKEN_SECRET!,
		);
		return accessToken;
	}

	static async generateRefreshToken(userId: string): Promise<string> {
		const refreshToken = await sign(
			{ userId, exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60 }, // 7 days
			process.env.REFRESH_TOKEN_SECRET!,
		);
		return refreshToken;
	}

	static async generateRefreshandAccessToken(userId: string) {
		try {
			const user = await db.user.findUnique({ where: { id: userId } });
			if (!user) throw Error("user not found! Invalid user Id");
			const accessTokens = await this.generateAccessToken({
				userId: user!.id,
				name: user!.name,
				email: user!.email,
			});
			const refreshTokens = await this.generateRefreshToken(user!.id);

			// update refresh token in db
			await db.user.update({
				where: { id: user!.id },
				data: { refreshToken: refreshTokens },
			});

			return { accessTokens, refreshTokens };
		} catch (error) {
			throw new Error("Error generating tokens");
		}
	}

	static async verifyAccessTokens(token: string) {
		try {
			return await verify(token, Bun.env.ACCESS_TOKEN_SECRET!);
		} catch (error) {
			throw new Error("Invalid tokens");
		}
	}

	static async verifyRefershTokens(token: string) {
		try {
			return await verify(token, Bun.env.REFRESH_TOKEN_SECRET!);
		} catch (error) {
			throw new Error("Invlid tokens");
		}
	}
}

export { AuthHandler };
