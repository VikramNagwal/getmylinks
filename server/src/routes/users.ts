import { Hono } from "hono";
import {
	createUserProfile,
	getUserProfile,
	updateUserProfile,
} from "../controller/user.controller";

const userRouter = new Hono();

userRouter
	.post("/profile", createUserProfile)
	.get("/profile/:userId", getUserProfile)
	.post("/profile/:userId/update", updateUserProfile);

export { userRouter };
