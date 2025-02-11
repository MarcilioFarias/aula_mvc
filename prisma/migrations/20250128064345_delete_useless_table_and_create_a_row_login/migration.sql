/*
  Warnings:

  - You are about to drop the `login` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[loginUser]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `loginUser` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "login" DROP CONSTRAINT "login_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loginUser" TEXT NOT NULL;

-- DropTable
DROP TABLE "login";

-- CreateIndex
CREATE UNIQUE INDEX "User_loginUser_key" ON "User"("loginUser");
