import { z } from "zod";

export const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.regex(/[A-Z]/, "Password must contain an uppercase letter")
	.regex(/[a-z]/, "Password must contain a lowercase letter")
	.regex(/[0-9]/, "Password must contain a number")
	.regex(/[^A-Za-z0-9]/, "Password must contain a special character");

export const signUpSchema = z
	.object({
		name: z
			.string()
			.min(3, "Name must be at least 3 characters")
			.max(50, "Name cannot exceed 50 characters")
			.regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
		username: z
			.string()
			.min(3, "Username must be at least 3 characters")
			.max(30, "Username cannot exceed 30 characters")
			.regex(
				/^[a-zA-Z0-9_-]*$/,
				"Username can only contain letters, numbers, underscores, and hyphens",
			)
			.toLowerCase(), // Convert to lowercase for consistency
		email: z.string().email("Invalid email address").toLowerCase(), // Convert to lowercase for consistency
		password: passwordSchema,
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export const LoginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8).max(255),
});
