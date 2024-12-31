import { decode, sign, verify } from 'hono/jwt'
import { OrganizationType } from '../controller/auth.controller';
import { db } from '../config/db';

type TokenPaylod = {
    userId: number;
    name: string;
    email: string;
    organization?: OrganizationType;
}

class AuthHandler {
    static async hashPassword(password: string): Promise<string> {
        const hashedPassword = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 4
        })
        return hashedPassword;
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        const isMatch = await Bun.password.verify(password, hashedPassword);
        return isMatch;
    }

    static async generateAccessToken(payload: TokenPaylod): Promise<string> {
        const accessToken = sign({payload, exp: 900 }, process.env.ACCESS_TOKEN_SECRET!)
        return accessToken;
    }

    static async generateRefreshToken(userId: number): Promise<string> {
        const refreshToken = sign({userId, exp: 86400 }, process.env.REFRESH_TOKEN_SECRET!)
        return refreshToken;
    }

    static async generateRefreshandAccessToken(userId: number) {
        const user = await db.userTable.findUnique({where: {id: userId}});
        const accessTokens = await this.generateAccessToken({userId: user!.id, name: user!.name, email: user!.email, organization: user!.organization as OrganizationType});
        const refreshTokens = await this.generateRefreshToken(user!.id);
        return {accessTokens, refreshTokens};
    }
}

export { AuthHandler }