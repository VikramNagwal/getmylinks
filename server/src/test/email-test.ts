import { emailQueue } from "../queues/email.queue";

(async () => {
	const data = await emailQueue.add("send-email", {
		email: "vasant@example.com",
		otp: "784595",
	});
	console.log("Email job added to the queue");
	// console.log(data);
})();
