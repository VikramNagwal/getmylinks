import { db } from "../config/db";
(async () => {
	try {
		db.$executeRawUnsafe(`TRUNCATE TABLE "userTable" RESTART IDENTITY CASCADE`);
		console.log("Table reset successfully, auto-increment IDs start from 1.");
	} catch (error) {
		console.log("Error resetting table", error);
	} finally {
		db.$disconnect();
	}
})();
