import { Hono } from "hono";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/auth.controller";

const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/logout", logoutUser);

export { authRouter };
