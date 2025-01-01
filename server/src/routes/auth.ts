import { Hono } from "hono";
import {
	loginUser,
	logoutUser,
	registerUser,
} from "../controller/auth.controller";

const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.delete("//logout", logoutUser); // add feature to logout user with unique entity

export { authRouter };
