import { nanoid } from "nanoid";
import db from "../config/db";
import { ApiError } from "../utils/error-handler";

async function createShortLink(url: string, custom?: string): Promise<string> {
	try {
		const shortCode = custom || nanoid(8);
		const shortUrl = `${Bun.env.FRONTEND_URL}/${shortCode}`;
		console.log("service");

		await db.urlMapping.create({
			data: {
				longUrl: url,
				shortUrl: shortCode,
			},
		});
		return shortUrl;
	} catch (error) {
		throw new Error("Error while creating short link");
	}
}

export { createShortLink };
