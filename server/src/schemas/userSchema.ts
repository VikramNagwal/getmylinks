import { z } from "zod";

const UserRegisterSchema = z.object({
	username: z.string(),
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	bio: z.string().max(999).optional(),
});

const UserLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(40),
});

const UserUpdateSchema = z
	.object({
		name: z.string().optional(),
		bio: z.string().max(999).optional(),
	})
	.strict();

const EmailBody = z
	.object({
		email: z.string().email("please provide a valid email address"),
	})
	.strict();

export { UserRegisterSchema, UserLoginSchema, UserUpdateSchema, EmailBody };
