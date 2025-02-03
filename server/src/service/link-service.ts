import { nanoid } from "nanoid";
import db from "../config/dbConfig";
import { UAParser } from "ua-parser-js";
import { logger } from "../utils/logger";

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

export { getUserDetails };

class LinkService {
	async createShortLink(params: {
		url: string;
		title?: string;
		userId: string;
	}) {
		const { url, title, userId } = params;
		try {
			if (title) {
				const existingTitle = await this.checkTitleExists(title);
				if (existingTitle) {
					return {
						message: "title already exists",
						shortUrl: `http://localhost:8080/r/${title}`,
					};
				}
			}

			const existingUrl = await this.checkUrlExists(url);
			if (existingUrl) {
				return {
					message: "Short url already exists",
					shortUrl: `http://localhost:8080/r/${existingUrl}`,
				};
			}

			const shortCode = title || nanoid(8);
			await db.link.create({
				data: {
					url,
					shortUrl: shortCode,
					userId,
				},
			});

			return {
				success: true,
				message: "creared",
				shortUrl: `http://localhost:8080/r/${shortCode}`,
			};
		} catch (error) {
			logger.error("Error while creating short link", error);
			throw new Error("Error while creating short link");
		}
	}

	private async checkUrlExists(url: string) {
		try {
			const response = await db.link.findFirst({
				where: { url },
				select: {
					isActive: true,
					shortUrl: true,
				},
			});
			if (!response) return false;

			return response.shortUrl;
		} catch (error) {
			logger.error("Error while fetching short link", error);
			throw new Error("Error while fetching short link");
		}
	}

	private async checkTitleExists(title: string) {
		try {
			const response = await db.link.findFirst({
				where: { shortUrl: title },
				select: {
					isActive: true,
				},
			});
			if (!response) return false;

			return true;
		} catch (error) {
			logger.error("Error while fetching short link title", error);
			throw new Error("Error while fetching short link title");
		}
	}
}

export default new LinkService() as LinkService;
