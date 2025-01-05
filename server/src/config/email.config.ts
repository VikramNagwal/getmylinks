export const EMAIL_CONFIG = {
	host: process.env.SMTP_HOST,
	port: parseInt(process.env.SMTP_PORT || "587"),
	secure: process.env.SMTP_SECURE === "true",
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASS,
	},
	// Add TLS options for production
	...(process.env.NODE_ENV === "production" && {
		tls: {
			rejectUnauthorized: true,
		},
	}),
};
