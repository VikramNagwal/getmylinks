import { Resend } from "resend";
import { logger } from "../../utils/logger";

interface ResendEmailProps {
    email: string;
    subject:  string;
    react: React.ReactNode;
    text: string;
}

const resend = Bun.env.RESEND_API_KEY ? new Resend(Bun.env.RESEND_API_KEY) : null;

export const sendMailviaResend = async ({email, subject, text, react}: ResendEmailProps) => {
    if (!resend) {
        logger.warning("Email API key not found. Please add the key to your environment variables");
        return;
    }
    try {
        const { data, error } = await resend.emails.send({
            from: `"OTP Verification" <${Bun.env.SMTP_EMAIL}>`,
            to: email,
            subject,
            text,
            react,
        })
        if (error as unknown) {
            throw new Error(error?.message);
        }
        logger.success("Email sent successfully ✓");
        return data;
    } catch (error) {
        logger.error("Failed to send email via Resend API", {error});
        throw new Error("Unable to send email. Email sending utility malfunctioned! please check the logs");
    }
}