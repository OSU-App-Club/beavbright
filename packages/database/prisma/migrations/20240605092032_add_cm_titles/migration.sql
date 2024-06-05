/*
  Warnings:

  - Added the required column `title` to the `CourseMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseMaterial" ADD COLUMN     "title" TEXT NOT NULL;
