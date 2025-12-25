/*
  Warnings:

  - Added the required column `foodType` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FoodType" AS ENUM ('VEG', 'NON_VEG');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'RESTURANT';

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "foodType" "FoodType" NOT NULL;

-- CreateTable
CREATE TABLE "DishRating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "userId" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DishRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergen" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Allergen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DishAllergen" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "allergenId" TEXT NOT NULL,

    CONSTRAINT "DishAllergen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DishRating_userId_dishId_key" ON "DishRating"("userId", "dishId");

-- CreateIndex
CREATE UNIQUE INDEX "DishAllergen_dishId_allergenId_key" ON "DishAllergen"("dishId", "allergenId");

-- AddForeignKey
ALTER TABLE "DishRating" ADD CONSTRAINT "DishRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishRating" ADD CONSTRAINT "DishRating_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishAllergen" ADD CONSTRAINT "DishAllergen_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishAllergen" ADD CONSTRAINT "DishAllergen_allergenId_fkey" FOREIGN KEY ("allergenId") REFERENCES "Allergen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
