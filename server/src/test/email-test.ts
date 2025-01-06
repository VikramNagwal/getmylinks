import { emailQueue } from "../queues/email.queue";

(async () => {
	const data = await emailQueue.add("send-email", {
		email: "dupaal@example.com",
		otp: "841037",
	});
	console.log("Email job added to the queue");
	// console.log(data);
})();
