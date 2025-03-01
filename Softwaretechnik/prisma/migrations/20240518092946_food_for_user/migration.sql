/*
  Warnings:

  - Added the required column `userid` to the `food` table without a default value. This is not possible if the table is not empty.

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
    "userid" TEXT NOT NULL,
    CONSTRAINT "food_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "meals" ("mid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "food_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_food" ("calories", "carbohydrates", "containsMeat", "fat", "fid", "mealid", "name", "protein", "vegan", "vegetarian") SELECT "calories", "carbohydrates", "containsMeat", "fat", "fid", "mealid", "name", "protein", "vegan", "vegetarian" FROM "food";
DROP TABLE "food";
ALTER TABLE "new_food" RENAME TO "food";
CREATE UNIQUE INDEX "food_fid_key" ON "food"("fid");
PRAGMA foreign_key_check("food");
PRAGMA foreign_keys=ON;
