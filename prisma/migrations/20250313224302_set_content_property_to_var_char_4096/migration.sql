-- AlterTable
ALTER TABLE `content` MODIFY `content` VARCHAR(4096) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deletedAt` DATETIME(3) NULL;
