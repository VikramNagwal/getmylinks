import app from "./app";
import { logger } from "./utils/logger";

Bun.serve({
	fetch: app.fetch,
});

logger.info("Server started on port http://localhost:8080");
