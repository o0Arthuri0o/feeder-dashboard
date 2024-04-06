-- CreateTable
CREATE TABLE "Feeder" (
    "Vessel" TEXT NOT NULL,
    "Voyage" TEXT NOT NULL,
    "ETD" TEXT NOT NULL,
    "ETA" TEXT NOT NULL,
    "POL" TEXT NOT NULL,
    "POD" TEXT NOT NULL,

    CONSTRAINT "Feeder_pkey" PRIMARY KEY ("Vessel","Voyage","ETD","ETA","POL","POD")
);

-- CreateTable
CREATE TABLE "Track" (
    "POL" TEXT NOT NULL,
    "POD" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("POL","POD")
);
