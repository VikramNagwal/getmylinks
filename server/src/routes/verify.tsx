import { Hono } from "hono";
import { EmailTemplate } from "../emails/email-template"
import { Resend } from "resend";


const verifyRouter = new Hono();
const resend = new Resend(String(Bun.env.RESEND_API_KEY));

verifyRouter.get("/send", async (c) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["vikramnagwal@gmail.com"],
    subject: "hey from hono backend",
    react: <EmailTemplate firstName="John" />,
  });

  if (error) {
    return c.json(error, 400);
  }

  return c.json(data);
});


export { verifyRouter };