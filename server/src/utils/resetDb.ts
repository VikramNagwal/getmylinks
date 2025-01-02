const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function resetTable() {
	try {
		// Truncate the table and restart identity (reset auto-increment IDs)
		await prisma.$executeRawUnsafe(
			`TRUNCATE TABLE "UserTable" RESTART IDENTITY CASCADE`,
		);
		console.log("Table reset successfully, auto-increment IDs start from 1.");
	} catch (error) {
		console.error("Error resetting the table:", error);
	} finally {
		await prisma.$disconnect();
	}
}

resetTable();
