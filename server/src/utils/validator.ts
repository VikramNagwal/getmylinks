import { zValidator } from "@hono/zod-validator";

export const schemaValidator = (schema: any) => {
	return zValidator("json", schema, (result, c) => {
		if (!result.success) return c.text(`Invalid ${schema} format`, 400);
	});
};
