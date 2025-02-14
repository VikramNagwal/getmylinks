import { Context, Hono } from "hono";
import db from "../config/dbConfig";
import { EmailBodySchema, UsernameBodySchema } from "../zod/userSchema";
import { logger } from "../utils/logger";
import { HttpStatusCode } from "../@types/types";


const checkRouter = new Hono()

checkRouter.post("/email" ,async (c: Context) => {
	try {
		const {email} = EmailBodySchema.parse(await c.req.json());

		const existingEmail = await db.user.findFirst({where: {email}, select:{email: true}})
		if(existingEmail) {
			return c.json({
			success: true,
			emailIdExists: true,
			emailIdAvailable: false,
			validForRegisteration: false,
			validForLogin: true
		})
		}

		return c.json({
			success: true,
			emailIdExists: false,
			emailIdAvailable: true,
			validForRegisteration: true,
			validForLogin: false
		})
	} catch (error) {
		logger.error("unable to fetch email from database");
		return c.json({ success: false, message: "Unable to fetch email from database", error}, HttpStatusCode.InternalServerError)
	}
})

checkRouter.post("/username", async (c: Context) => {
    try {
       const { username } = UsernameBodySchema.parse( await c.req.json());

       const existingUsername = await db.user.findUnique({ where: {username}, select: {username: true}})
       if(existingUsername) {
        return c.json({
            success: true,
            isUsernameAvailable: false,
        }, HttpStatusCode.Conflict)
       }

       return c.json({
        success: true,
        isUsernameAvailable: true,
       }, HttpStatusCode.Ok)
    } catch (error) {
        logger.error("Unable to fetch username from database")
        return c.json({
            success: false,
            message: "Unable to fetch username from database",
            error
        }, HttpStatusCode.InternalServerError)
    }
})

export { checkRouter }