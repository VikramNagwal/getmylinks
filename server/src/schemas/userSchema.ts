import { z } from "zod";

export const userProfileSchema = z.object({
	userId: z.string().max(40).min(3),
	name: z.string(),
	email: z.string().email(),
	bio: z.string().max(999),
	avatarUrl: z.string().url(),
	coverUrl: z.string().url(),
	interests: z.array(z.string().min(2).max(40)),
});
