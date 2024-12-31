import type { Context } from "hono";
import { db } from "../config/db";
import { AuthHandler } from "../utils/authHandler";
import { HttpStatusCode } from "../types/Index";

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

		const existingUser = await db.userTable.findFirst({ where: { email } });
		if (existingUser) {
			return c.json({ message: "User already exists" }, 400);
		}

		const hashedPassword = await AuthHandler.hashPassword(password);

		const registerdUser = await db.userTable.create({
			data: {
				name: String(name.trim().toLowerCase()),
				email: String(email.trim().toLowerCase()),
				password: hashedPassword,
				organization: organization || "INDIVIDUAL",
			},
		});
		if (!registerdUser)
			return c.json(
				{ message: "Unable to register user in database" },
				HttpStatusCode.InternalServerError,
			);
		const { password: _, ...userData } = registerdUser;

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
	} catch (error) {
		return c.json({});
	}
};

export { registerUser };
