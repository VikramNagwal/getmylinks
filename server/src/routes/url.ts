import { Context, Hono } from "hono";

const urlRouter = new Hono();

urlRouter.get("/shorten", (c: Context) => {
	return c.json({ message: "Shorten URL" });
});

export { urlRouter };
