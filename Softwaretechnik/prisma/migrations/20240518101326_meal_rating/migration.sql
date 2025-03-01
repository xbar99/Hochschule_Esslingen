/*
  Warnings:

  - Added the required column `rating` to the `Meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Meals_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Meals" ("createDate", "mid", "titel", "updateDate", "userid") SELECT "createDate", "mid", "titel", "updateDate", "userid" FROM "Meals";
DROP TABLE "Meals";
ALTER TABLE "new_Meals" RENAME TO "Meals";
CREATE UNIQUE INDEX "Meals_mid_key" ON "Meals"("mid");
CREATE UNIQUE INDEX "Meals_userid_key" ON "Meals"("userid");
PRAGMA foreign_key_check("Meals");
PRAGMA foreign_keys=ON;
