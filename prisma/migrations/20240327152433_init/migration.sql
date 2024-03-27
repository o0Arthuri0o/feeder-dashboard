-- CreateTable
CREATE TABLE "Feeder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Vessel" TEXT NOT NULL,
    "Voyage" TEXT NOT NULL,
    "ETD" TEXT NOT NULL,
    "ETA" TEXT NOT NULL,
    "POL" TEXT NOT NULL,
    "POD" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "POL" TEXT NOT NULL,
    "POD" TEXT NOT NULL
);
