import { Context, Hono } from "hono";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/auth.controller";
import { verifyJWT } from "../middlewares/auth-middleware";
import { HttpStatusCode } from "../types/types";
import { validateOtpToken } from "../service/otp-service";
import db from "../config/db-config";
import { ApiError } from "../utils/error-utils";

const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/:uid/verify", async (c: Context) => {
	try {
		const uid = c.req.param("uid");
		const clientOtp = await c.req.parseBody();
		const token = String(clientOtp.otp);

		if (!clientOtp || !uid) {
			return c.json(
				ApiError.badRequest("Invalid otp token, please try again", {
					clientOtp,
					uid,
				}),
			);
		}

		const isValid = await validateOtpToken(token);
		await db.user.findUnique({ where: { verificationUid: uid } });
		await db.user.update({
			where: { verificationUid: uid },
			data: { isVerified: true, verificationUid: null },
		});

		return c.json(
			{
				success: true,
				message: "otp verified",
				clientOtp,
				isValid: isValid,
			},
			HttpStatusCode.Ok,
		);
	} catch (error) {
		return c.json(
			new ApiError("An error occurred while verifying otp", 500, true, error),
			500,
		);
	}
});
authRouter.delete("/logout", verifyJWT, logoutUser); // add feature to logout user with unique entity

export { authRouter };
