import Redis from "ioredis";
import { logger } from "../config/loggerConfig";

const redis = new Redis({
	host: Bun.env.REDIS_HOST,
	port: Number(Bun.env.REDIS_PORT),
	retryStrategy: (times) => {
		const delay = Math.min(times * 50, 2000);
		return delay;
	},
});

redis.on("error", (error) => {
	logger.error(`Redis connection error: ${error}`);
});
export default redis;
