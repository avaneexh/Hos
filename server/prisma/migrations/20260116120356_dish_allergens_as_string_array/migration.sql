/*
  Warnings:

  - You are about to drop the `Allergen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DishAllergen` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Addon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DishAllergen" DROP CONSTRAINT "DishAllergen_allergenId_fkey";

-- DropForeignKey
ALTER TABLE "DishAllergen" DROP CONSTRAINT "DishAllergen_dishId_fkey";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "allergens" TEXT[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL;

-- DropTable
DROP TABLE "Allergen";

-- DropTable
DROP TABLE "DishAllergen";

-- CreateIndex
CREATE UNIQUE INDEX "Addon_name_key" ON "Addon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
