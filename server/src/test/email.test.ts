import { addEmailtoQueue, emailQueue } from "../queues/email.queue";
import { describe, it, expect } from "bun:test";
import { generateOTP, generateUID } from "../service/otp-service";

describe("send mail", () => {
	it("it should send mail", async () => {
		const email = "dineshjakarta@gmail.me";
		const otp = await generateOTP();
		const uid = await generateUID();

		const job = await emailQueue.add("testing email", { email, otp, uid });
		expect(job).pass("test passed");
		expect(job.data.email).toBe(email);
	});
});
