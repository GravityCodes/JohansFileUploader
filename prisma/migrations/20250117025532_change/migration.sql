/*
  Warnings:

  - You are about to drop the column `parentFolderId` on the `File` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parentFolderName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_parentFolderId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "parentFolderId",
ADD COLUMN     "parentFolderName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "Folder"("name");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_parentFolderName_fkey" FOREIGN KEY ("parentFolderName") REFERENCES "Folder"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
