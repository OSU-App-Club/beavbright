/*
  Warnings:

  - You are about to drop the column `hmsCode` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "hmsCode";

-- CreateTable
CREATE TABLE "RoomCode" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,

    CONSTRAINT "RoomCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomCode" ADD CONSTRAINT "RoomCode_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
