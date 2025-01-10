import { nanoid } from "nanoid";
import db from "../config/db";
import { UAParser } from "ua-parser-js";

async function createShortLink(url: string, custom?: string): Promise<string> {
	try {
		const shortCode = custom || nanoid(8);
		console.log("service");

		await db.urlMapping.create({
			data: {
				longUrl: url,
				shortUrl: shortCode,
			},
		});
		return shortCode;
	} catch (error) {
		throw new Error("Error while creating short link");
	}
}

function getUserDetails(req: any) {
	const uaParser = new UAParser(req.header("User-Agent"));
	const parsed = uaParser.getResult();
	const ip = req.header("x-forwarded-for") || req.header("x-real-ip");

	return {
		userAgent: req.header("user-agent"),
		ipAddress: ip,
		referer: req.header("referer"),
		deviceType: parsed.device.type || "desktop",
		browser: parsed.browser.name,
		os: parsed.os.name,
	};
}

export { createShortLink, getUserDetails };
