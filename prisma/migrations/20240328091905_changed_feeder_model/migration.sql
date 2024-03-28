/*
  Warnings:

  - The primary key for the `Feeder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Feeder` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feeder" (
    "Vessel" TEXT NOT NULL,
    "Voyage" TEXT NOT NULL,
    "ETD" TEXT NOT NULL,
    "ETA" TEXT NOT NULL,
    "POL" TEXT NOT NULL,
    "POD" TEXT NOT NULL,

    PRIMARY KEY ("Vessel", "Voyage", "ETD", "ETA")
);
INSERT INTO "new_Feeder" ("ETA", "ETD", "POD", "POL", "Vessel", "Voyage") SELECT "ETA", "ETD", "POD", "POL", "Vessel", "Voyage" FROM "Feeder";
DROP TABLE "Feeder";
ALTER TABLE "new_Feeder" RENAME TO "Feeder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
