/*
  Warnings:

  - Added the required column `userid` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "meals_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_meals" ("createDate", "mid", "titel", "updateDate") SELECT "createDate", "mid", "titel", "updateDate" FROM "meals";
DROP TABLE "meals";
ALTER TABLE "new_meals" RENAME TO "meals";
CREATE UNIQUE INDEX "meals_mid_key" ON "meals"("mid");
PRAGMA foreign_key_check("meals");
PRAGMA foreign_keys=ON;
