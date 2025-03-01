/*
  Warnings:

  - You are about to drop the `food` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `meals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "food";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "meals";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Users" (
    "uid" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Meals_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Statistics" (
    "sid" TEXT NOT NULL PRIMARY KEY,
    "totalCalories" INTEGER NOT NULL,
    "averageMealRating" INTEGER NOT NULL,
    "meatFreeMeals" INTEGER NOT NULL,
    "co2Savings" INTEGER NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL,
    "mealid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "Statistics_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "Meals" ("mid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Statistics_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "foods" (
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
    "mealid" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    CONSTRAINT "foods_mealid_fkey" FOREIGN KEY ("mealid") REFERENCES "Meals" ("mid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "foods_userid_fkey" FOREIGN KEY ("userid") REFERENCES "Users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_uid_key" ON "Users"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Meals_mid_key" ON "Meals"("mid");

-- CreateIndex
CREATE UNIQUE INDEX "Meals_userid_key" ON "Meals"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_sid_key" ON "Statistics"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_mealid_key" ON "Statistics"("mealid");

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_userid_key" ON "Statistics"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "foods_fid_key" ON "foods"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "foods_mealid_key" ON "foods"("mealid");

-- CreateIndex
CREATE UNIQUE INDEX "foods_userid_key" ON "foods"("userid");
