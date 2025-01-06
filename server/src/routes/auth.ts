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
import { ApiError } from "../utils/error-handler";

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
				ApiError.badRequest("Invalid otp token, please try again", {
					clientOtp,
					uid,
				}),
			);
		}

		const isValid = await validateOtpToken(token);
		if (!isValid) {
			return c.json(ApiError.badRequest("Invalid otp token, please try again"));
		}

		const user = await db.user.findUnique({ where: { verificationUid: uid } });
		if (!user) {
			return c.json(ApiError.notFound("User does not exist! cant verify otp"));
		}

		await db.user.update({
			where: { verificationUid: uid },
			data: { isVerified: true },
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
		);
	}
});

export { authRouter };
