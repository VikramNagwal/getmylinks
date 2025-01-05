import { Queue } from "bullmq";
import { QUEUE_NAME, REDIS_CONFIG, QUEUE_CONFIG } from "../config/queue.config";
import { EmailJobData } from "../types/email.types";
import { logger } from "../config/logger";

export const emailQueue = new Queue<EmailJobData>(QUEUE_NAME, {
	connection: REDIS_CONFIG,
	defaultJobOptions: QUEUE_CONFIG.defaultJobOptions,
});

export const addEmailtoQueue = async ({ email, otp }: EmailJobData) => {
	console.log("picked by queue");
	try {
		const job = await emailQueue.add("send-verification-mail", {
			email,
			otp,
		});
		logger.info(`Email job ${job.id} added to queue`);
		return job;
	} catch (error) {
		logger.error("Error adding email to queue:", error);
		throw new Error("Error adding email to queue");
	}
};

emailQueue.on("error", (error) => {
	logger.error("Email queue error:", error);
});
