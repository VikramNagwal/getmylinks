import { ConnectionOptions } from "bullmq";

export const QUEUE_NAME = "email-queue";

export const REDIS_CONFIG: ConnectionOptions = {
	host: Bun.env.REDIS_HOST,
	port: Number(Bun.env.REDIS_PORT),
	password: Bun.env.REDIS_PASSWORD,
	tls: process.env.NODE_ENV === "production" ? {} : undefined,
};

export const QUEUE_CONFIG = {
	connection: {
		host: Bun.env.REDIS_HOST || "localhost",
		port: Number(Bun.env.REDIS_PORT) || 6379,
	} as ConnectionOptions,

	// Job options
	defaultJobOptions: {
		attempts: 3,
		backoff: {
			type: "exponential",
			delay: 1000,
		},
		removeOnComplete: true,
	},
};
