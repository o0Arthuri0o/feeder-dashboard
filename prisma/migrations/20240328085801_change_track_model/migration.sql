/*
  Warnings:

  - The primary key for the `Track` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Track` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Track" (
    "POL" TEXT NOT NULL,
    "POD" TEXT NOT NULL,

    PRIMARY KEY ("POL", "POD")
);
INSERT INTO "new_Track" ("POD", "POL") SELECT "POD", "POL" FROM "Track";
DROP TABLE "Track";
ALTER TABLE "new_Track" RENAME TO "Track";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
