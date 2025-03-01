/*
  Warnings:

  - You are about to drop the column `fid` on the `meals` table. All the data in the column will be lost.
  - Added the required column `mealid` to the `food` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_food" (
    "fid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "containsMeat" BOOLEAN NOT NULL,
    "vegetarian" BOOLEAN NOT NULL,
    "vegan" BOOLEAN NOT NULL,
    "mealid" TEXT NOT NULL,
    CONSTRAINT "food_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "meals" ("mid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_food" ("calories", "carbohydrates", "containsMeat", "fat", "fid", "name", "protein", "vegan", "vegetarian") SELECT "calories", "carbohydrates", "containsMeat", "fat", "fid", "name", "protein", "vegan", "vegetarian" FROM "food";
DROP TABLE "food";
ALTER TABLE "new_food" RENAME TO "food";
CREATE UNIQUE INDEX "food_fid_key" ON "food"("fid");
CREATE UNIQUE INDEX "food_mealid_key" ON "food"("mealid");
CREATE TABLE "new_meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL
);
INSERT INTO "new_meals" ("createDate", "mid", "titel", "updateDate") SELECT "createDate", "mid", "titel", "updateDate" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
CREATE UNIQUE INDEX "meals_mid_key" ON "meals"("mid");
PRAGMA foreign_key_check("food");
PRAGMA foreign_key_check("meals");
PRAGMA foreign_keys=ON;
