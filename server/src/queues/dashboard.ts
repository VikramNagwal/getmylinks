import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { HonoAdapter } from "@bull-board/hono";
import { emailQueue } from "./email.queue"; // Ensure the emailQueue is correctly imported
import { basicAuth } from "hono/basic-auth";
import { Hono } from "hono";

const dashboardApp = new Hono(); // Hono app for the dashboard
const serverAdapter = new HonoAdapter(dashboardApp);
serverAdapter.setBasePath("/admin/queues"); // Ensure base path is set correctly

createBullBoard({
	queues: [new BullMQAdapter(emailQueue)],
	serverAdapter,
});

// Basic auth middleware for securing the dashboard
const authMiddleware = basicAuth({
	username: Bun.env.ADMIN_USERNAME || "admin",
	password: Bun.env.ADMIN_PASSWORD || "admin",
});

dashboardApp.use("*", authMiddleware);

dashboardApp.get("/bull-board", (c) => {
	return c.text("Bull Board Test!");
});
// Secure all routes on dashboardApp

export { serverAdapter, dashboardApp };
