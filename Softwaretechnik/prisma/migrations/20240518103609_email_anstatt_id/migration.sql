/*
  Warnings:

  - You are about to drop the column `userid` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `Meals` table. All the data in the column will be lost.
  - Added the required column `email` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_foods" (
    "fid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "containsMeat" BOOLEAN NOT NULL,
    "vegetarian" BOOLEAN NOT NULL,
    "vegan" BOOLEAN NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "mealid" TEXT,
    "email" TEXT NOT NULL,
    CONSTRAINT "foods_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "Meals" ("mid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "foods_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_foods" ("calories", "carbohydrates", "containsMeat", "createDate", "fat", "fid", "mealid", "name", "protein", "updateDate", "vegan", "vegetarian") SELECT "calories", "carbohydrates", "containsMeat", "createDate", "fat", "fid", "mealid", "name", "protein", "updateDate", "vegan", "vegetarian" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
CREATE UNIQUE INDEX "foods_fid_key" ON "foods"("fid");
CREATE UNIQUE INDEX "foods_email_key" ON "foods"("email");
CREATE TABLE "new_Statistics" (
    "sid" TEXT NOT NULL PRIMARY KEY,
    "totalCalories" INTEGER NOT NULL,
    "averageMealRating" INTEGER NOT NULL,
    "meatFreeMeals" INTEGER NOT NULL,
    "co2Savings" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "mealid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Statistics_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "Meals" ("mid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Statistics_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Statistics" ("averageMealRating", "co2Savings", "createDate", "mealid", "meatFreeMeals", "sid", "totalCalories", "updateDate") SELECT "averageMealRating", "co2Savings", "createDate", "mealid", "meatFreeMeals", "sid", "totalCalories", "updateDate" FROM "Statistics";
DROP TABLE "Statistics";
ALTER TABLE "new_Statistics" RENAME TO "Statistics";
CREATE UNIQUE INDEX "Statistics_sid_key" ON "Statistics"("sid");
CREATE UNIQUE INDEX "Statistics_mealid_key" ON "Statistics"("mealid");
CREATE UNIQUE INDEX "Statistics_email_key" ON "Statistics"("email");
CREATE TABLE "new_Meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Meals_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meals" ("createDate", "mid", "rating", "titel", "updateDate") SELECT "createDate", "mid", "rating", "titel", "updateDate" FROM "Meals";
DROP TABLE "Meals";
ALTER TABLE "new_Meals" RENAME TO "Meals";
CREATE UNIQUE INDEX "Meals_mid_key" ON "Meals"("mid");
CREATE UNIQUE INDEX "Meals_email_key" ON "Meals"("email");
PRAGMA foreign_key_check("foods");
PRAGMA foreign_key_check("Statistics");
PRAGMA foreign_key_check("Meals");
PRAGMA foreign_keys=ON;
