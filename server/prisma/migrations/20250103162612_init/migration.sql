/*
  Warnings:

  - You are about to drop the `userProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Organization" AS ENUM ('INDIVIDUAL', 'BUISNESS');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Beta', 'Premium');

-- DropTable
DROP TABLE "userProfile";

-- CreateTable
CREATE TABLE "UserTable" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "organization" "Organization" DEFAULT 'INDIVIDUAL',
    "userType" "UserType" NOT NULL DEFAULT 'Beta',
    "refreshToken" TEXT,

    CONSTRAINT "UserTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTable_username_key" ON "UserTable"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserTable_email_key" ON "UserTable"("email");
