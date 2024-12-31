import { Hono } from "hono";
import { registerUser } from "../controller/auth.controller";

const authRouter = new Hono();

authRouter.post("/register", registerUser);

export { authRouter };
