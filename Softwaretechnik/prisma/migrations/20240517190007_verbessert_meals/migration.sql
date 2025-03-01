/*
  Warnings:

  - You are about to drop the column `mid` on the `food` table. All the data in the column will be lost.
  - Added the required column `fid` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "fid" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    CONSTRAINT "meals_fid_fkey" FOREIGN KEY ("fid") REFERENCES "food" ("fid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("createDate", "mid", "titel", "updateDate") SELECT "createDate", "mid", "titel", "updateDate" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
CREATE UNIQUE INDEX "meals_mid_key" ON "meals"("mid");
CREATE UNIQUE INDEX "meals_fid_key" ON "meals"("fid");
CREATE TABLE "new_food" (
    "fid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "containsMeat" BOOLEAN NOT NULL,
    "vegetarian" BOOLEAN NOT NULL,
    "vegan" BOOLEAN NOT NULL
);
INSERT INTO "new_food" ("calories", "carbohydrates", "containsMeat", "fat", "fid", "name", "protein", "vegan", "vegetarian") SELECT "calories", "carbohydrates", "containsMeat", "fat", "fid", "name", "protein", "vegan", "vegetarian" FROM "food";
DROP TABLE "food";
ALTER TABLE "new_food" RENAME TO "food";
CREATE UNIQUE INDEX "food_fid_key" ON "food"("fid");
PRAGMA foreign_key_check("meals");
PRAGMA foreign_key_check("food");
PRAGMA foreign_keys=ON;
