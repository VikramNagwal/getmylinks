import { Worker } from "bullmq";
import { logger } from "../../utils/logger";
import { QUEUE_NAME, REDIS_CONFIG } from "../../config/queueConfig";
import { sendMailtoUser } from "../../service/email-service";



const emailWorker = new Worker(
	QUEUE_NAME,

	async (job) => {
		const { email, otp, uid } = job.data;
		logger.info(`Starting to process email job ${job.id} for ${email}`);

		try {
			await job.updateProgress(50);
			const result = await sendMailtoUser(email, otp, uid);
			await job.updateProgress(100);

			logger.success(`Email sent successfully for job ${job.id}`, {
				messageId: result.messageId,
				response: result.response,
			});

			return result.messageId;
		} catch (error) {
			logger.error(`Failed to send email for job ${job.id}:`, {
				error,
				email,
				attempt: job.attemptsMade + 1,
			});
			throw new Error("Failed to send email");
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


// Event listeners
emailWorker.on("completed", (job) => {
	logger.success(`✓ Email job ${job.id} completed successfully`, {
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
