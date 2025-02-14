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
		name: z.string().min(3).optional(),
		bio: z.string().min(2).max(999).optional(),
	})
	.strict();

const EmailBodySchema = z.object({
	email: z.string().email("please provide a valid email address"),
});

const UsernameBodySchema = z.object({
	username: z.string().regex(/^\S+$/, {
		message: "The string must not contain spaces.",
	}),
});

const otpSchema = z.object({
	otp: z.string().max(6).min(6),
});

export {
	UserRegisterSchema,
	UserLoginSchema,
	UserUpdateSchema,
	EmailBodySchema,
	UsernameBodySchema,
	otpSchema,
};
