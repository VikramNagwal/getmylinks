import { z } from "zod";

export const profileSchema = z.object({
	bio: z
		.string()
		.min(3, "don't know enough about yourself??")
		.max(999, "calm down! 🙂")
		.optional(),
});
