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
    "userid" TEXT NOT NULL,
    CONSTRAINT "foods_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "Meals" ("mid") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "foods_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_foods" ("calories", "carbohydrates", "containsMeat", "createDate", "fat", "fid", "mealid", "name", "protein", "updateDate", "userid", "vegan", "vegetarian") SELECT "calories", "carbohydrates", "containsMeat", "createDate", "fat", "fid", "mealid", "name", "protein", "updateDate", "userid", "vegan", "vegetarian" FROM "foods";
DROP TABLE "foods";
ALTER TABLE "new_foods" RENAME TO "foods";
CREATE UNIQUE INDEX "foods_fid_key" ON "foods"("fid");
CREATE UNIQUE INDEX "foods_userid_key" ON "foods"("userid");
PRAGMA foreign_key_check("foods");
PRAGMA foreign_keys=ON;
