/*
  Warnings:

  - Added the required column `breakfast` to the `Meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dinner` to the `Meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunch` to the `Meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breakfast` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dinner` to the `foods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lunch` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "breakfast" BOOLEAN NOT NULL,
    "lunch" BOOLEAN NOT NULL,
    "dinner" BOOLEAN NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "Meals_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meals" ("createDate", "email", "mid", "rating", "titel", "updateDate") SELECT "createDate", "email", "mid", "rating", "titel", "updateDate" FROM "Meals";
DROP TABLE "Meals";
ALTER TABLE "new_Meals" RENAME TO "Meals";
CREATE UNIQUE INDEX "Meals_mid_key" ON "Meals"("mid");
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
    "breakfast" BOOLEAN NOT NULL,
    "lunch" BOOLEAN NOT NULL,
    "dinner" BOOLEAN NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "mealid" TEXT,
    "email" TEXT NOT NULL,
    CONSTRAINT "foods_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "Meals" ("mid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "foods_email_fkey" FOREIGN KEY ("email") REFERENCES "Users" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_foods" ("calories", "carbohydrates", "containsMeat", "createDate", "email", "fat", "fid", "mealid", "name", "protein", "updateDate", "vegan", "vegetarian") SELECT "calories", "carbohydrates", "containsMeat", "createDate", "email", "fat", "fid", "mealid", "name", "protein", "updateDate", "vegan", "vegetarian" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
CREATE UNIQUE INDEX "foods_fid_key" ON "foods"("fid");
PRAGMA foreign_key_check("Meals");
PRAGMA foreign_key_check("foods");
PRAGMA foreign_keys=ON;
