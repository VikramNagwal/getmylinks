import { Hono } from "hono";
import { loginUser, registerUser } from "../controller/auth.controller";

const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export { authRouter };
