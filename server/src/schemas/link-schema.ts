import z from "zod";

export const LinkSchema = z.object({
	title: z.string().optional(),
	url: z.string().url("required: please provide a valid url"),
});

export const ShortUrlSchema = z.string().regex(/^\S+$/, {
  message: "The string must not contain spaces.",
});
