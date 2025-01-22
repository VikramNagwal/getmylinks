import { nanoid } from "nanoid";
import db from "../config/dbConfig";
import { UAParser } from "ua-parser-js";
import { Context } from "hono";
import { getIdFromMiddleware } from "./user-service";
import { LinkSchema } from "../schemas/link-schema";

async function createShortLink(c: Context): Promise<string> {
	try {
		const createdById = await getIdFromMiddleware(c);
		const { url, title } = LinkSchema.parse(await c.req.json());

		const shortCode = title || nanoid(8);
		console.log(shortCode);
		const urlData = await db.url.create({
			data: {
				longUrl: url,
				shortUrl: shortCode,
				createdById,
			},
		});
		console.log(urlData);

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
		const response = await db.url.findFirst({
			where: { longUrl: url },
			select: {
				isActive: true,
				shortUrl: true,
			},
		});
		if (!response) {
			return false;
		}
		return response.shortUrl;
	} catch (error) {
		throw new Error("Error while fetching short link");
	}
}

async function checkTitleExists(title: string) {
	try {
		const response = await db.url.findFirst({
			where: { shortUrl: title },
			select: {
				isActive: true,
			},
		});
		if (!response) {
			return false;
		}
		return true;
	} catch (error) {
		throw new Error("Error while fetching short link");
	}
}

export { createShortLink, getUserDetails, checkUrlExists, checkTitleExists };
