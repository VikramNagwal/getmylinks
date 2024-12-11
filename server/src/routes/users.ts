import { Hono } from "hono";
import {
	createUserProfile,
	getUserProfile,
	sayhii,
} from "../controller/userController";
import { zValidator } from "@hono/zod-validator";
import { userRequestSchema } from "../schemas/userSchema";

const userRouter = new Hono();

userRouter.post("/profile", createUserProfile);
userRouter.get("/greet", sayhii);
userRouter.get("/profile/:userId", getUserProfile);

export { userRouter };
