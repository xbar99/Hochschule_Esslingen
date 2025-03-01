-- CreateTable
CREATE TABLE "meals" (
    "mid" TEXT NOT NULL PRIMARY KEY,
    "titel" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "food" (
    "fid" TEXT NOT NULL PRIMARY KEY,
    "mid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "carbohydrates" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,
    "protein" INTEGER NOT NULL,
    "containsMeat" BOOLEAN NOT NULL,
    "vegetarian" BOOLEAN NOT NULL,
    "vegan" BOOLEAN NOT NULL,
    CONSTRAINT "food_mid_fkey" FOREIGN KEY ("mid") REFERENCES "meals" ("mid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "meals_mid_key" ON "meals"("mid");

-- CreateIndex
CREATE UNIQUE INDEX "food_fid_key" ON "food"("fid");

-- CreateIndex
CREATE UNIQUE INDEX "food_mid_key" ON "food"("mid");
