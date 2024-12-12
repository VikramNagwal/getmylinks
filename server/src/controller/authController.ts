import type { Context } from "hono";

const userAuth = {
	registerUser: async (c: Context) => {
		const { name, email, password } = c.req.param();
	},
};
