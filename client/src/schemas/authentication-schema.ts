import { z } from "zod";

export const SignUpSchema = z
	.object({
		name: z
			.string()
			.min(3, "Name must be at least 3 characters")
			.max(255)
			.regex(/^[a-zA-Z\s]+$/),
		username: z
			.string()
			.min(3)
			.max(255)
			.regex(/^[a-zA-Z@*%]+$/),
		email: z.string().email("Invalid email address"),
		password: z
			.string()
			.min(8)
			.max(255)
			.regex(/^[a-zA-Z0-9@*%]+$/, "Please enter a Valid Password"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
