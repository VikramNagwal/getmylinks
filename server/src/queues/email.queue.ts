import { Queue } from "bullmq";
import { QUEUE_NAME, REDIS_CONFIG, QUEUE_CONFIG } from "../config/queueConfig";
import { EmailJobData } from "../@types/email.types";
import { logger } from "../utils/logger";

export const emailQueue = new Queue<EmailJobData>(QUEUE_NAME, {
	connection: REDIS_CONFIG,
	defaultJobOptions: QUEUE_CONFIG.defaultJobOptions,
});

export const addEmailtoQueue = async ({ email, token, uid }: EmailJobData) => {
	try {
		const job = await emailQueue.add("send-verification-mail", {
			email,
			token,
			uid,
		});
		logger.info(`Email job ${job.id} added to queue`);
		return job;
	} catch (error) {
		logger.error("Error adding email to queue:", error);
		throw new Error("Error adding email to queue");
	}
};

// Event listeners
emailQueue.on("error", (error) => {
	logger.error("Email queue error:", error);
});

emailQueue.on("resumed", () => {
	logger.info("Email queue resumed");
});

emailQueue.on("waiting", () => {
	logger.warning("Email queue waiting");
});
