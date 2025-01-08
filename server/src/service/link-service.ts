import { nanoid } from "nanoid";


async function createShortLink(url: string, custom?: string): Promise<string> {
  const shortUrl = `${Bun.env.FRONTEND_URL}/${custom || nanoid(6)}`;
  console.log(shortUrl);
  return shortUrl;
}

createShortLink('https://www.google.com')