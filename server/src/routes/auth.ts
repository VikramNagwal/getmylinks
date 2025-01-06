import { Context, Hono } from "hono";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { HttpStatusCode } from "../types/types";
import { validateOtpToken } from "../service/user-validation";
import db from "../config/db";

const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.delete("/logout", verifyJWT, logoutUser); // add feature to logout user with unique entity

authRouter.post("/:uid/verify", async (c: Context) => {
	try {
		const uid = c.req.param("uid");
		const clientOtp = await c.req.parseBody();
		const token = String(clientOtp.otp);

		if (!clientOtp || !uid) {
			return c.json(
				{ message: "please provide credentials to proceed", clientOtp, isValid: false },
				HttpStatusCode.BadRequest,
			);
		}
		
		const isValid = true
		if (!isValid) {
			return c.json(
				{ message: "otp verification failed! Invalid code", clientOtp, isValid: isValid },
				HttpStatusCode.BadRequest,
			);
		}

		const user = await db.user.findUnique({ where: { verificationUid: uid}})
		if (!user) {
			return c.json(
				{ 
					success: false,
					message: "User not found" 
				},
				HttpStatusCode.NotFound,
			);
		}

		await db.user.update({
			where: { verificationUid: uid },
			data: { isVerified: true },
		});
		return c.json(
			{ 
				success: true,
				message: "otp verified", clientOtp, isValid: isValid 
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			{
				success: false,
				isOperational: true,
				message: "Unable to verify Email, Internal server error",
				errorMessage: (error as any)?.message,
				error,
			},
			HttpStatusCode.InternalServerError,
		);
	}
});

export { authRouter };
