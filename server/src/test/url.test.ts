import { describe, it, expect } from "bun:test";
import { createShortLink } from "../service/link-service";
import db from "../config/dbConfig";

const addUrl = async (url: string) => {
	const shortId = "HuvT76CV";
	const shortData = await db.link.create({
		data: {
			url,
			shortUrl: shortId,
			user: {
				connect: { id: "1" },
			},
		},
	});
	console.log(shortData);
	return shortData;
};

describe("test url", () => {
    it("should create short link", async () => {
        const url = 'https://claude.ai/chat/7e667ccd-cbb5-4c90-8a84-3e50eb290c11'

        const shorturl = await createShortLink("gysagya",url,'test');
        expect(shorturl.length).toBeGreaterThan(6)
        expect(shorturl).toBeString()
    });
})
