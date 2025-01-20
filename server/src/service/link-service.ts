import { nanoid } from "nanoid";
import db from "../config/dbConfig";
import { UAParser } from "ua-parser-js";

async function createShortLink(url: string, custom?: string): Promise<string> {
	try {
		const shortCode = custom || nanoid(8);
		await db.url.create({
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

async function checkUrlExists(url: string) {
	try {
		const response = await db.url.findUnique({
			where: { shortUrl: url },
			select: {
				isActive: true,
			},
		});
		if (!response) {
			return false;
		}
		return response.isActive ? true : false;
	} catch (error) {
		throw new Error("Error while fetching short link");
	}
}

export { createShortLink, getUserDetails, checkUrlExists };
