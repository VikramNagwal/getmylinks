import { Worker } from "bullmq";
import { QUEUE_NAME, REDIS_CONFIG } from "../../config/queue.config";
import { logger } from "../../config/logger";
import { sendMailtoUser } from "../../service/email-service";

const emailWorker = new Worker(
	QUEUE_NAME,
	async (job) => {
		const { email, otp } = job.data;
		logger.info(`Starting to process email job ${job.id} for ${email}`);

		try {
			await job.updateProgress(50);
			const result = await sendMailtoUser(email, otp);
			await job.updateProgress(100);

			logger.info(`Email sent successfully for job ${job.id}`, {
				messageId: result.messageId,
				response: result.response,
			});

			return result.messageId; // Return messageId for tracking
		} catch (error) {
			logger.error(`Failed to send email for job ${job.id}:`, {
				error,
				email,
				attempt: job.attemptsMade + 1,
			});
			throw error;
		}
	},
	{
		connection: REDIS_CONFIG,
		concurrency: 5,
		settings: {
			backoffStrategy: (attemptsMade) => {
				return Math.min(1000 * Math.pow(2, attemptsMade), 30000); // Max 30 seconds
			},
		},
	},
);

emailWorker.on("completed", (job) => {
	logger.info(`✓ Email job ${job.id} completed successfully`, {
		result: job.returnvalue,
	});
});

emailWorker.on("failed", (job, error) => {
	logger.error(`✗ Email job ${job?.id} failed:`, {
		error,
		attemptsMade: job?.attemptsMade,
		data: job?.data,
	});
});

export { emailWorker };
