import z from "zod";

export const LinkSchema = z.object({
	url: z
		.string()
		.url("required: please provide a valid url")
		.nonempty("Please provide a valid url"),
	title: z.string().optional(),
});

export const ShortUrlSchema = z.string().regex(/^\S+$/, {
	message: "The string must not contain spaces.",
});
