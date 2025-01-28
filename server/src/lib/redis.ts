import Redis from "ioredis";
import { logger } from "../utils/logger";

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

redis.on("connect", () => {
	logger.success("Redis connected successfully");
});

redis.on("reconnecting", () => {
	logger.warning("Redis reconnecting");
});

redis.on("end", () => {
	logger.warning("Redis connection ended");
});
export default redis;
