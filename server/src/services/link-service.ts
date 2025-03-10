import { nanoid } from "nanoid";
import db from "@lib/db";
import { UAParser } from "ua-parser-js";
import { logger } from "@/utils/logger";

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
						shortUrl: title,
					};
				}
			}

			const existingUrl = await this.checkUrlExists(url);
			if (existingUrl) {
				return {
					message: "Short url already exists",
					shortUrl: `${Bun.env.BASE_URL}/r/${existingUrl}`,
				};
			}

			const shortCode = title || nanoid(6);
			await db.link.create({
				data: {
					url,
					shortUrl: shortCode,
					userId,
				},
			});

			return {
				success: true,
				message: "short link created",
				shortUrl: shortCode,
			};
		} catch (error) {
			logger.error("Error while creating short link", error);
			throw new Error("Error while creating short link");
		}
	}

	async getAllLinks(userId: string) {
		try {
			const links = await db.link.findMany({
				where: { userId },
				select: {
					url: true,
					shortUrl: true,
					totalViews: true,
					createdAt: true,
				},
			});
			return links;
		} catch (error) {
			logger.error("Error while fetching all links", error);
			throw new Error("No links found");
		}
	}

	async checkUrlExists(url: string) {
		try {
			const response = await db.link.findUnique({
				where: { url: url },
				select: {
					id: true,
					isActive: true,
					expiresAt: true,
					shortUrl: true,
				},
			});

			if (!response) return false; // Everything is okay

			if (
				response.expiresAt &&
				new Date(response.expiresAt || !response.isActive) < new Date()
			) {
				await db.link.delete({ where: { id: response.id } });
				return false;
			}

			return response.shortUrl; // url exists
		} catch (error) {
			logger.error("Error while fetching short link", error);
			throw new Error("Error while fetching short link");
		}
	}

	async checkTitleExists(title: string) {
		try {
			const response = await db.link.findFirst({
				where: { shortUrl: title },
				select: {
					isActive: true,
				},
			});
			if (!response) return false; //Everything is okay

			return true; // title exists
		} catch (error) {
			logger.error("Error while fetching short link title", error);
			throw new Error("Error while fetching short link title");
		}
	}
}

export default new LinkService() as LinkService;
