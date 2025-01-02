import { Context, Hono } from "hono";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { HttpStatusCode } from "../types/types";
import { getRecordById, isUserExist } from "../service/db-methods";
import { validateOtpToken } from "../service/user-validation";

const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.delete("/logout", verifyJWT, logoutUser); // add feature to logout user with unique entity

authRouter.post("/email/verify", async (c: Context) => {
	try {
		const clientOtp = await c.req.parseBody();
		const token = String(clientOtp["token"]);
		const isValid = await validateOtpToken(token);		
		
		return c.json({ clientOtp, isValid: isValid }, HttpStatusCode.Ok);
	} catch (error) {
		return c.json({
			success: false,
			isOperational: true,
			message: "Unable to verify Email, Internal server error",
			errorMessage: (error as any)?.message,
			error,
		}, HttpStatusCode.InternalServerError)
	}
})

export { authRouter };
