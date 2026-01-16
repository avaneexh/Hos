/*
  Warnings:

  - You are about to drop the column `status` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "status",
ADD COLUMN     "inMenu" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;

-- DropEnum
DROP TYPE "DishStatus";
