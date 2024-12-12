import { Context } from "hono";

export const simpleMiddleware = async (c: Context, next: () => Promise<Response>): Promise<Response> => {

  try {

    return await next();

  } catch (err) {

    console.error(err);

    c.status(500);

    return c.json({ error: "Internal Server Error" });

  }

};
